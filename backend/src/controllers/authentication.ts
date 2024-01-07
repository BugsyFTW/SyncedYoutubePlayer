import { Request, Response } from 'express';

import { getUserByEmail, createUser } from "@/db/User/actions";
import { random, authentication } from "@helpers";
import variables from '@/config/variables';

export const login = async (req: Request, res: Response) => {
	try {

		const { email, password } = req.body;


		if (!email || !password) {
			return res.status(400).json({ error: "Missing email or password" });
		}

		const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

		if (!user) {
			return res.status(400).json({ error: "No user found" });
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (expectedHash !== user.authentication.password) {
			return res.status(403).json({ error: "Wrong password" });
		}

		const salt = random();
		user.authentication.sessionToken = authentication(salt, user._id.toString());

		await user.save();

		res.cookie(variables.getCookieName(), user.authentication.sessionToken, { domain: 'localhost', path: '/' });

		return res.status(200).json(user);
	} catch (error) {
		console.error(error);
		return res.status(400);
	}
}

export const register = async (req: Request, res: Response) => {
	try {

		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ error: "Missing username or email or password" });
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400).json({ error: "User with email already exists" });
		}

		const salt = random();
		const user = await createUser({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			}
		});

		return res.status(200).json(user);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}