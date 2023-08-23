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
import { loginUser } from '@services/user';
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
import { loginSchema } from '@/data/formFields';
import { FormImage } from './_styles';
import Image from 'next/image';

export default function RegisterForm() {
	const router = useRouter();
	const isActive = useFadeIn();
	const { setUser } = useAuthContext();

	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});
	const { username, password } = loginForm.getValues();

	const { data, error, isMutating, trigger } = useSWRMutation(
		'api/session',
		() => loginUser(username, password),
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
			<Form data-testid='login-form' {...loginForm}>
				<form
					onSubmit={loginForm.handleSubmit(async () => trigger())}
					className={clsx(
						'mx-auto my-16 flex w-full flex-col space-y-8  transition-opacity duration-150 sm:max-w-xs md:max-w-sm',
						// isActive && 'opacity-100',
					)}
				>
					<p className='mb-5 flex justify-center text-2xl font-medium text-main-orange'>
						Share your ideas with the world.
					</p>

					<FormField
						control={loginForm.control}
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
						control={loginForm.control}
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

// 'use client';
// import { useEffect } from 'react';
// import useSWRMutation from 'swr/mutation';
// import registerImage from '@assets/register-image.webp';
// import { registerFields } from '../../data/formFields';
// import { registerVal } from '../../data/validationValues';
// import { useFadeIn } from '@hooks/useFadeIn';
// import { useForm } from '@hooks/useForm';
// import { useValidation } from '@hooks/useValidation';
// import { UserFormLayout } from '../../layouts/UserFormLayout';
// import { createUser } from '@services/user';
// import { Spinner } from '../../style/Spinner';

// import {
// 	UserFormContainer,
// 	UserForm,
// 	StyledLabel,
// 	InputHeader,
// 	ErrorMessage,
// 	Input,
// 	LoginButton,
// 	FormImage,
// 	HeroTitle,
// 	ServerErrorDisplay,
// } from './_styles';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function RegisterForm() {
// 	const router = useRouter();
// 	const isActive = useFadeIn();

// 	const { formData, handleChange, handleBlur } = useForm(registerFields);
// 	const { isFormValid, shouldMarkErr } = useValidation(registerVal, formData);
// 	const { username, password, password2 } = formData;

// 	const { data, error, isMutating, trigger } = useSWRMutation('/api/user', () =>
// 		createUser(username, password, password2)
// 	);

// 	useEffect(() => {
// 		if (!data) return;
// 		console.log('router: ', router);
// 		router.push('/login');
// 	}, [data]);

// 	return (
// 		<UserFormLayout isActive={isActive}>
// 			<UserFormContainer>
// 				<UserForm
// 					name='register-form'
// 					onSubmit={e => {
// 						e.preventDefault();
// 						trigger();
// 					}}
// 					autoComplete='on'
// 				>
// 					<HeroTitle> Connect with the world ideas.</HeroTitle>
// 					<InputHeader>
// 						<StyledLabel htmlFor='username'> Username </StyledLabel>
// 						<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
// 							Username is required
// 						</ErrorMessage>
// 					</InputHeader>
// 					<Input
// 						type='text'
// 						id='username'
// 						name='username'
// 						placeholder='Username123'
// 						autoComplete='on'
// 						maxLength={20}
// 						minLength={1}
// 						value={username}
// 						onBlur={handleBlur}
// 						onChange={handleChange}
// 						shouldMarkError={shouldMarkErr('username')}
// 					/>
// 					<InputHeader>
// 						<StyledLabel htmlFor='password'> Password </StyledLabel>
// 						<ErrorMessage shouldMarkError={shouldMarkErr('password')}>
// 							{' '}
// 							Must be 5 characters or longer{' '}
// 						</ErrorMessage>
// 					</InputHeader>
// 					<Input
// 						type='password'
// 						id='password'
// 						name='password'
// 						placeholder='+5 characters'
// 						autoComplete='on'
// 						maxLength={20}
// 						minLength={5}
// 						value={password}
// 						onBlur={handleBlur}
// 						onChange={handleChange}
// 						shouldMarkError={shouldMarkErr('password')}
// 					/>
// 					<InputHeader>
// 						<StyledLabel htmlFor='password'> Confirm password </StyledLabel>
// 						<ErrorMessage shouldMarkError={shouldMarkErr('password2')}>
// 							Passwords should match
// 						</ErrorMessage>
// 					</InputHeader>
// 					<Input
// 						type='password'
// 						data-testid='confirm-password'
// 						id='password2'
// 						name='password2'
// 						autoComplete='on'
// 						maxLength={20}
// 						minLength={5}
// 						value={password2}
// 						onBlur={handleBlur}
// 						onChange={handleChange}
// 						shouldMarkError={shouldMarkErr('password2')}
// 					/>
// 					<ServerErrorDisplay serverError={error}>
// 						{error || 'No error'}
// 					</ServerErrorDisplay>
// 					<LoginButton type='submit' disabled={isFormValid() || isMutating}>
// 						{isMutating ? <Spinner data-testid='spinner' /> : 'Register'}
// 					</LoginButton>
// 				</UserForm>
// 			</UserFormContainer>
// 			<FormImage alt='register' src={registerImage.src}></FormImage>
// 		</UserFormLayout>
// 	);
// }
