'use client';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import registerImage from '../../assets/register-image.webp';
import { registerFields } from '../../data/formFields';
import { registerVal } from '../../data/validationValues';
import { useFadeIn } from '../../hooks/useFadeIn';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { createUser } from '../../services/user';
import { Spinner } from '../../style/Spinner';

import {
	UserFormContainer,
	UserForm,
	StyledLabel,
	InputHeader,
	ErrorMessage,
	Input,
	LoginButton,
	FormImage,
	HeroTitle,
	ServerErrorDisplay,
} from './_styles';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
	const router = useRouter();
	const isActive = useFadeIn();

	const { formData, handleChange, handleBlur } = useForm(registerFields);
	const { isFormValid, shouldMarkErr } = useValidation(registerVal, formData);
	const { username, password, password2 } = formData;

	const { data, error, isMutating, trigger } = useSWRMutation('/api/user', () =>
		createUser(username, password, password2)
	);

	useEffect(() => {
		if (!data) return;
		router.push('/login');
	}, [data]);

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={trigger} autoComplete='on'>
					<HeroTitle> Connect with the world ideas.</HeroTitle>
					<InputHeader>
						<StyledLabel htmlFor='username'> Username </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
							Username is required
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
							Must be 5 characters or longer{' '}
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
					<InputHeader>
						<StyledLabel htmlFor='password'> Confirm password </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('password2')}>
							Passwords should match
						</ErrorMessage>
					</InputHeader>
					<Input
						type='password'
						id='password2'
						name='password2'
						autoComplete='on'
						maxLength={20}
						minLength={5}
						value={password2}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password2')}
					/>
					<ServerErrorDisplay serverError={error}>
						{error || 'No error'}
					</ServerErrorDisplay>
					<LoginButton type='submit' disabled={isFormValid() || isMutating}>
						{isMutating ? <Spinner /> : 'Register'}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={registerImage}></FormImage>
		</UserFormLayout>
	);
}
