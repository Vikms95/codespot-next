'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';
import loginImage from '@assets/login-image.webp';
import { loginFields } from '../../data/formFields';
import { loginVal } from '../../data/validationValues';
import { useFadeIn } from '@hooks/useFadeIn';
import { useForm } from '@hooks/useForm';
import { useValidation } from '@hooks/useValidation';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { loginUser } from '@services/user';
import { Spinner } from '../../style/Spinner';
import { getFromStorage } from '../../utils/getFromStorage';
import { setToStorage } from '../../utils/setToStorage';

import {
	UserFormContainer,
	UserForm,
	HeroTitle,
	StyledLabel,
	Input,
	InputHeader,
	LoginButton,
	FormImage,
	ErrorMessage,
	ServerErrorDisplay,
} from './_styles';
import { useAuthContext } from '@/context/AuthContext';

export default function LoginForm() {
	const router = useRouter();
	const isActive = useFadeIn();
	const { setUser } = useAuthContext();

	const { formData, handleChange, handleBlur } = useForm(loginFields);
	const { isFormValid, shouldMarkErr } = useValidation(loginVal, formData);
	const { username, password } = formData;
	const [shouldFetch, setShouldFetch] = useState(false);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? 'api/session' : null,
		() => loginUser(username, password)
	);

	useEffect(() => {
		if (!data) return;

		setUser(data.user);
		setToStorage('token', data.token);
		setShouldFetch(false);

		if (hasPostToRedirect()) {
			return redirectToPost();
		}

		router.push('/dashboard');
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setShouldFetch(true);
	};

	const redirectToPost = () => {
		const postid = getFromStorage('postToRedirect');
		// return navigate(`/posts/${postid}`);
	};

	const hasPostToRedirect = () => {
		const postToRedirect = getFromStorage('postToRedirect');
		if (postToRedirect) return postToRedirect;
	};

	return (
		<UserFormLayout data-testid='login-form' isActive={isActive}>
			<UserFormContainer>
				<UserForm name='login-form' onSubmit={handleSubmit} autoComplete='on'>
					<HeroTitle> Share your ideas with the world.</HeroTitle>
					<InputHeader>
						<StyledLabel htmlFor='username'> Username </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
							{' '}
							Username is required{' '}
						</ErrorMessage>
					</InputHeader>
					<Input
						type='text'
						id='username'
						name='username'
						autoComplete='on'
						maxLength={20}
						minLength={1}
						value={username}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('username')}
					/>
					<InputHeader>
						<StyledLabel htmlFor='password'> Password </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('password')}>
							{' '}
							Password is required{' '}
						</ErrorMessage>
					</InputHeader>
					<Input
						type='password'
						id='password'
						name='password'
						autoComplete='on'
						maxLength={20}
						minLength={5}
						value={password}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password')}
					/>
					<ServerErrorDisplay serverError={error}>
						{error || 'No error'}
					</ServerErrorDisplay>
					<LoginButton type='submit' disabled={isFormValid() || isLoading}>
						{isLoading ? <Spinner></Spinner> : 'Login'}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={loginImage.src}></FormImage>
		</UserFormLayout>
	);
}
