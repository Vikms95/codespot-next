'use client';
import { useAuthContext } from '@/context/AuthContext';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { useFadeIn } from '@hooks/useFadeIn';
import { loginUser } from '@services/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { getFromStorage } from '../../utils/getFromStorage';
import { setToStorage } from '../../utils/setToStorage';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/style/Spinner';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxWithText } from '@/components/ui/checkbox-with-text';

const formSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Username must be at least 1 character.' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters.' }),
});

export default function LoginForm() {
	const router = useRouter();
	const isActive = useFadeIn();
	const { setUser } = useAuthContext();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const { username, password } = form.getValues();
	const { data, error, isMutating, trigger } = useSWRMutation(
		'api/session',
		() => loginUser(username, password),
	);

	useEffect(() => {
		if (!data) return;

		setUser(data.user);
		setToStorage('token', data.token);

		if (hasPostToRedirect()) {
			return redirectToPost();
		}

		router.push('/dashboard');
	});

	const redirectToPost = () => {
		const postid = getFromStorage('postToRedirect');
		// return navigate(`/posts/${postid}`);
	};

	const hasPostToRedirect = () => {
		const postToRedirect = getFromStorage('postToRedirect');
		if (postToRedirect) return postToRedirect;
	};

	return (
		<Form data-testid='login-form' {...form}>
			<form
				onSubmit={form.handleSubmit(async () => trigger())}
				className='mx-auto my-16 flex w-full flex-col space-y-8 sm:max-w-xs md:max-w-sm'
			>
				<p className='flex justify-center text-2xl font-medium text-main-orange'>
					Share your ideas with the world.
				</p>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Password' {...field} />
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
					<Button className='mx-auto my-auto flex w-full' type='submit'>
						{isMutating ? <Spinner data-testid='spinner' /> : 'Login'}
					</Button>

					<Button
						className='mx-auto my-auto flex w-full bg-white text-black outline outline-1 outline-black'
						type='submit'
					>
						{isMutating ? (
							<Spinner data-testid='spinner' />
						) : (
							'Sign in with Google'
						)}
					</Button>
				</div>
				<div className='flex justify-center gap-x-2'>
					<p className='text-main-grey'>Don't have an account?</p>
					<a
						className='transition-all hover:cursor-pointer hover:underline'
						onClick={() => router.push('/register')}
					>
						Sign up for free
					</a>
				</div>
			</form>
		</Form>
		// <UserFormLayout data-testid='login-form' isActive={isActive}>
		// 	<UserFormContainer>
		// 		<UserForm name='login-form' onSubmit={handleSubmit} autoComplete='on'>
		// 			<HeroTitle> Share your ideas with the world.</HeroTitle>
		// 			<InputHeader>
		// 				<StyledLabel htmlFor='username'> Username </StyledLabel>
		// 				<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
		// 					{' '}
		// 					Username is required{' '}
		// 				</ErrorMessage>
		// 			</InputHeader>
		// 			<Input
		// 				type='text'
		// 				id='username'
		// 				name='username'
		// 				placeholder='Username123'
		// 				autoComplete='on'
		// 				maxLength={20}
		// 				minLength={1}
		// 				value={username}
		// 				onBlur={handleBlur}
		// 				onChange={handleChange}
		// 				shouldMarkError={shouldMarkErr('username')}
		// 			/>
		// 			<InputHeader>
		// 				<StyledLabel htmlFor='password'> Password </StyledLabel>
		// 				<ErrorMessage shouldMarkError={shouldMarkErr('password')}>
		// 					{' '}
		// 					Password is required{' '}
		// 				</ErrorMessage>
		// 			</InputHeader>
		// 			<Input
		// 				type='password'
		// 				id='password'
		// 				name='password'
		// 				autoComplete='on'
		// 				maxLength={20}
		// 				minLength={5}
		// 				value={password}
		// 				onBlur={handleBlur}
		// 				onChange={handleChange}
		// 				shouldMarkError={shouldMarkErr('password')}
		// 			/>

		// 			<div className={clsx('text-transparent opacity-0 duration-300 transition-opacity', error && 'opacity-100 text-red-600')}>
		// 				{error || 'No error'}
		// 			</div>

		// 			<LoginButton type='submit' disabled={isFormValid() || isMutating}>
		// 				{isMutating ? <Spinner data-testid='spinner' /> : 'Login'}
		// 			</LoginButton>
		// 		</UserForm>
		// 	</UserFormContainer>
		// 	<FormImage alt='login' src={loginImage.src}></FormImage>
		// </UserFormLayout>
	);
}
