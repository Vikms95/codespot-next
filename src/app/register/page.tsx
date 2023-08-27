'use client';

import { Button } from '@/components/ui/button';
import { registerFields, registerSchema } from '@/data/formFields';
import { Spinner } from '@/style/Spinner';
import { formatError } from '@/utils/formatError';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFadeIn } from '@hooks/useFadeIn';
import { createUser } from '@services/user';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import * as z from 'zod';

export default function RegisterForm() {
	const router = useRouter();
	const isActive = useFadeIn();

	const registerForm = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: registerFields,
	});
	const { username, password, password2 } = registerForm.getValues();

	const { data, error, isMutating, trigger } = useSWRMutation('/api/user', () =>
		createUser(username, password, password2),
	);

	useEffect(() => {
		if (!data) return;
		router.push('/login');
	}, [data]);

	return (
		<section className='flex'>
			<Form data-testid='register-form' {...registerForm}>
				<form
					onSubmit={registerForm.handleSubmit(() => trigger())}
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
									<Input autoComplete='on' placeholder='John Doe' {...field} />
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
										placeholder='+4 characters'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name='password2'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input autoComplete='on' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex flex-col space-y-5'>
						<FormMessage className={clsx(error ? 'opacity-100' : 'opacity-0')}>
							{error ? formatError(error) : 'No error'}
						</FormMessage>

						<Button className='mx-auto my-auto flex w-full' type='submit'>
							{isMutating ? (
								<div data-testid='spinner' className='spinner' />
							) : (
								'Register'
							)}
						</Button>
					</div>
					<div className='flex justify-center gap-x-2'>
						<p className='text-main-grey sm:text-sm md:text-base'>
							Already have an account?
						</p>
						<a
							className='transition-all hover:cursor-pointer hover:underline sm:text-sm md:text-base'
							onClick={() => router.push('/login')}
						>
							Sign in
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
