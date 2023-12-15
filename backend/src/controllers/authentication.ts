import { Request, Response } from 'express';

import { getUserByEmail, createUser } from "@/db/User/actions";
import { random, authentication } from "@helpers";
import variables from '@/config/variables';

export const login = async (req: Request, res: Response) => {
	try {

		const { email, password } = req.body;


		if (!email || !password) {
			res.statusMessage = "Missing email or password";
			return res.sendStatus(400);
		}

		const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

		if (!user) {
			res.statusMessage = "No user found";
			return res.sendStatus(400);
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (expectedHash !== user.authentication.password) {
			res.statusMessage = "Wrong password";
			return res.sendStatus(403);						
		}

		const salt = random();
		user.authentication.sessionToken = authentication(salt, user._id.toString());

		await user.save();

		res.cookie(variables.getCookieName(), user.authentication.sessionToken, { domain: 'localhost', path: '/' });

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}

export const register = async (req: Request, res: Response) => {
	try {

		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			res.statusMessage = "Missing username or email or password";
			return res.sendStatus(400);
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			res.statusMessage = "User with email already exists";
			return res.sendStatus(400);
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

		return res.status(300).json(user).end();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}