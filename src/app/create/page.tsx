'use client';
import { useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';
import { usePostsContext } from '../../context/PostsContext';
import { postFields } from '../../data/formFields';
import { postVal } from '../../data/validationValues';
import { useFadeIn } from '../../hooks/useFadeIn';
import { usePostForm } from '../../hooks/usePostForm';
import { usePostToUpdate } from '../../hooks/usePostToUpdate';
import { useValidation } from '../../hooks/useValidation';
import { createPost, updatePost } from '../../services/post';
import { Label } from '../../style/Label';
import { Spinner } from '../../style/Spinner';
import { parseEditorData } from '../../utils/parseEditorData';
import useSWRMutation from 'swr/mutation';
import {
	PostFormContainer,
	StyledPostForm,
	TitleInput,
	FormBottomRow,
	StyledFaCheck,
	InputContainer,
	BottomRight,
	CheckBoxContainer,
	CheckBoxTitle,
	CheckBoxLabel,
	CheckBox,
	FormButton,
	ErrorMessage,
	StyledEditor,
} from './_styles';
import { Router } from 'react-router-dom';

export default function PostForm() {
	const isActive = useFadeIn();
	const router = useRouter();
	const { postid } = useParams();
	const editorRef = useRef(null);
	const { user } = useAuthContext();
	const { posts, setPosts } = usePostsContext();

	const {
		formData,
		setFormData,
		handleChange,
		handleImageChange,
		handleEditorChange,
		handlePrivacyChange,
	} = usePostForm(editorRef, postFields);
	usePostToUpdate(postid, posts, setFormData);
	const { isFormValid } = useValidation(postVal, formData);

	const { title, text, isPublic, image } = formData;

	const {
		data: createdPost,
		isMutating: isCreateLoading,
		trigger: triggerCreate,
	} = useSWRMutation('/api/post', () =>
		createPost(user, title, text, isPublic, image)
	);

	const {
		data: updatedPost,
		isMutating: isUpdateLoading,
		trigger: triggerUpdate,
	} = useSWRMutation(`/api/post/${postid}`, () =>
		updatePost(user, title, text, isPublic, image, postid, formData)
	);

	useEffect(() => {
		if (!createdPost) return;
		setPosts(prevPosts => [...prevPosts, createdPost]);
		return router.push('/dashboard');
	}, [createdPost]);

	useEffect(() => {
		if (!updatedPost) return;
		return router.push('/dashboard');
	}, [updatedPost]);

	function handleSubmit(e) {
		e.preventDefault();
		if (postid) {
			triggerUpdate();
		} else {
			triggerCreate();
		}
	}
	return (
		<PostFormContainer isActive={isActive}>
			<StyledPostForm onSubmit={handleSubmit} encType='multipart/form-data'>
				<Label htmlFor='title'>Title </Label>
				<TitleInput
					type='text'
					name='title'
					onChange={handleChange}
					placeholder='Post title ...'
					value={title}
					maxLength='35'
				/>
				<br />

				<Label htmlFor='text'>Post </Label>
				<StyledEditor
					onInit={(_e: Event, editor: any) => (editorRef.current = editor)}
					init={{
						height: 600,
						width: 1200,
						elementpath: false,
						plugins: 'code',
						menubar: true,
					}}
					apiKey='k1kgs8qmzd0isvug3s4btubgrps7yutyhiy7jbsi038go8sq'
					name='html'
					value={formData.text}
					onEditorChange={(content, editor) => {
						handleEditorChange(parseEditorData(content, editor));
					}}
				/>

				<br />
				<FormBottomRow>
					<InputContainer>
						<Label htmlFor='image'>Attach an image</Label>
						<input
							style={{ display: 'none' }}
							type='file'
							name='image'
							id='image'
							onChange={handleImageChange}
						/>
						{image && <StyledFaCheck />}
					</InputContainer>
					<br />
					<ErrorMessage>
						Image size should not exceed 100 megabytes{' '}
					</ErrorMessage>
					<br />
					<BottomRight>
						<CheckBoxTitle>Make this post public</CheckBoxTitle>
						<CheckBoxContainer>
							<CheckBox
								type='checkbox'
								name='privacy'
								onChange={handlePrivacyChange}
								checked={isPublic}
							/>
							<CheckBoxLabel htmlFor='privacy'></CheckBoxLabel>
						</CheckBoxContainer>
						<br />

						<FormButton
							type='submit'
							disabled={isFormValid() || isCreateLoading || isUpdateLoading}
						>
							{isCreateLoading || isUpdateLoading ? (
								<Spinner />
							) : postid ? (
								'Update post'
							) : (
								'Submit post'
							)}
						</FormButton>
					</BottomRight>
				</FormBottomRow>
			</StyledPostForm>
		</PostFormContainer>
	);
}
