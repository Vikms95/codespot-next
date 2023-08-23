'use client';

import loginImage from '@assets/login-image.webp';
import { Button } from '@/components/ui/button';
import { CheckboxWithText } from '@/components/ui/checkbox-with-text';
import { useAuthContext } from '@/context/AuthContext';
import { Spinner } from '@/style/Spinner';
import { formatError } from '@/utils/formatError';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFadeIn } from '@hooks/useFadeIn';
import { createUser, loginUser } from '@services/user';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import useSWRMutation from 'swr/mutation';
import * as z from 'zod';
import { getFromStorage } from '../../utils/getFromStorage';
import { setToStorage } from '../../utils/setToStorage';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form';
import { loginSchema, registerSchema } from '@/data/formFields';
import { FormImage } from './_styles';
import Image from 'next/image';

export default function LoginForm() {
	const router = useRouter();
	const isActive = useFadeIn();

	const registerForm = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			password: '',
			password2: '',
		},
	});
	const { username, password, password2 } = registerForm.getValues();

	const { data, error, isMutating, trigger } = useSWRMutation('/api/user', () =>
		createUser(username, password, password2),
	);

	useEffect(() => {
		if (!data) return;

		setUser(data.user);
		setToStorage('token', data.token);

		if (hasPostToRedirect()) {
			redirectToPost();
		} else {
			router.push('/dashboard');
		}
	});

	function redirectToPost() {
		const postid = getFromStorage('postToRedirect');
		return router.push(`/posts/${postid}`);
	}

	function hasPostToRedirect() {
		const postToRedirect = getFromStorage('postToRedirect');
		if (postToRedirect) return postToRedirect;
	}

	return (
		<section className='flex'>
			<Form data-testid='login-form' {...registerForm}>
				<form
					onSubmit={registerForm.handleSubmit(async () => trigger())}
					className={clsx(
						'mx-auto my-16 flex w-full flex-col space-y-8  transition-opacity duration-150 sm:max-w-xs md:max-w-sm',
						// isActive && 'opacity-100',
					)}
				>
					<p className='mb-5 flex justify-center text-2xl font-medium text-main-orange'>
						Share your ideas with the world.
					</p>

					<FormField
						control={registerForm.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input autoComplete='on' placeholder='Username' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={registerForm.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										autoComplete='on'
										type='password'
										placeholder='Password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-between'>
						<CheckboxWithText id='remember' text='Remember for 30 days' />
						<p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Forgot password
						</p>
					</div>

					<div className='flex flex-col space-y-5'>
						<FormMessage className={clsx(error ? 'opacity-100' : 'opacity-0')}>
							{error ? formatError(error) : 'No error'}
						</FormMessage>

						<Button className='mx-auto my-auto flex w-full' type='submit'>
							{isMutating ? <Spinner data-testid='spinner' /> : 'Login'}
						</Button>

						<Button
							className='mx-auto my-auto flex w-full bg-white text-black outline outline-1 outline-black hover:bg-main-grey'
							type='submit'
						>
							{isMutating ? (
								<Spinner data-testid='spinner' />
							) : (
								<div className='flex content-center justify-center gap-x-5'>
									<FaGoogle className='text-xl hover:cursor-pointer' />
									<div>Sign in with Google</div>
								</div>
							)}
						</Button>
					</div>
					<div className='flex justify-center gap-x-2'>
						<p className='text-main-grey sm:text-sm md:text-base'>
							Don't have an account?
						</p>
						<a
							className='transition-all hover:cursor-pointer hover:underline sm:text-sm md:text-base'
							onClick={() => router.push('/register')}
						>
							Sign up for free
						</a>
					</div>
				</form>
			</Form>
			{/* <Image
				width={420}
				height={150}
				className='hidden lg:flex'
				alt='login'
				src={loginImage.src}
			/> */}
		</section>
	);
}
