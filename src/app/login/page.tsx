'use client';
import { useAuthContext } from '@/context/AuthContext';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
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
				className=' mx-auto my-auto flex max-w-lg flex-col space-y-10'
			>
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
				<Button className='mx-auto my-auto px-4' type='submit'>
					{isMutating ? <Spinner data-testid='spinner' /> : 'Login'}
				</Button>
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
