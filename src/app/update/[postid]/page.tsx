'use client';
import { RichTextEditor } from '@/components/Form/RichTextEditor';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@components/ui/form';
import { useAuthContext } from '@context/AuthContext';
import { usePostsContext } from '@context/PostsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFadeIn } from '@hooks/useFadeIn';
import { createPost, updatePost } from '@services/post';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { postFields, postSchema } from '../../../data/formFields';
import { ENDPOINTS } from '@/constants';
import { findByID } from '@/utils/findbyID';
import { TPost } from '@/types';

export default function PostForm() {
	const isActive = useFadeIn();
	const router = useRouter();
	const { postid } = useParams();

	const { user } = useAuthContext();
	const { setPosts } = usePostsContext();
	const imageInputRef = useRef<HTMLInputElement>(null!);
	const post = findByID(JSON.parse(localStorage.getItem('posts')!), postid);

	const postForm = useForm<z.infer<typeof postSchema>>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: post.title,
			text: '',
			isPublic: post.public,
			image: '',
		},
	});

	const { data, isMutating, trigger } = useSWRMutation(
		() => ENDPOINTS.UPDATE_POST(postid),
		url => updatePost(url, user, title, text, isPublic, image, post?.timestamp),
	);

	useEffect(() => {
		if (!data) return;

		setPosts(prevPosts => [...prevPosts, data]);
		return router.push('/dashboard');
	}, [data]);

	const { text, title, isPublic, image } = postForm.getValues();

	return (
		<section
			className='flex w-10/12 items-center justify-center bg-white sm:mx-auto sm:my-5 lg:my-8'
			// isActive={isActive}
		>
			<Form
				data-testid='post-form'
				// @ts-expect-error
				encType='multipart/form-data'
				{...postForm}
			>
				<form onSubmit={postForm.handleSubmit(async () => trigger())}>
					<FormField
						control={postForm.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='sm:w-64 md:w-full'
										autoComplete='on'
										placeholder='Post title'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<br />

					<FormField
						control={postForm.control}
						name='text'
						render={control => (
							<FormItem>
								<FormControl>
									<RichTextEditor control={control} text={post?.text} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<br />

					<article className='flex sm:flex-wrap sm:justify-center md:justify-between'>
						<div className='flex flex-row justify-center'>
							<>
								<FormField
									control={postForm.control}
									name='image'
									render={({ field }) => (
										<FormItem className='pt-1.5'>
											<FormLabel
												onClick={() => imageInputRef.current.click()}
												className='cursor-pointer text-main-orange'
											>
												Attach an image
											</FormLabel>
											<FormControl className='h-0'>
												<Input
													className='invisible h-0 w-0'
													type='file'
													id='image'
													{...field}
													ref={imageInputRef}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{image && <FaCheck className='mt-1 text-green-500' />}
							</>
						</div>

						<br />

						<div className='flex gap-x-5 sm:flex-wrap sm:justify-center sm:gap-y-4 sm:text-xs md:justify-between'>
							<FormField
								control={postForm.control}
								name='isPublic'
								render={({ field }) => (
									<FormItem className='flex gap-x-2 rounded-lg '>
										<FormLabel className='cursor-pointer pt-3'>
											Make this post public
										</FormLabel>
										<FormControl>
											<Switch
												className='bg-main-orange'
												checked={field.value}
												onCheckedChange={field.onChange}
												aria-readonly
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<br />

							<Button
								type='submit'
								disabled={!postForm.formState.isValid || isMutating}
							>
								{isMutating ? <div className='spinner' /> : 'Update post'}
							</Button>
						</div>
					</article>
				</form>
			</Form>
		</section>
	);
}

// export default function PostForm() {
// 	const isActive = useFadeIn();
// 	const router = useRouter();
// 	const { postid } = useParams();
// 	const editorRef = useRef(null);
// 	const { user } = useAuthContext();
// 	const { posts, setPosts } = usePostsContext();

// 	const {
// 		formData,
// 		setFormData,
// 		handleChange,
// 		handleImageChange,
// 		handleEditorChange,
// 		handlePrivacyChange,
// 	} = usePostForm(editorRef, postFields);
// 	usePostToUpdate(postid, posts, setFormData);
// 	const { isFormValid } = useValidation(postVal, formData);

// 	const { title, text, isPublic, image } = formData;

// 	const {
// 		data: updatedPost,
// 		isMutating: isUpdateLoading,
// 		trigger: triggerUpdate,
// 		// } = useSWRMutation(`/api/post/${postid}`, url =>
// 	} = useSWRMutation(
// 		() => ENDPOINTS.UPDATE_POST(postid),
// 		url =>
// 			updatePost(
// 				url,
// 				user,
// 				title,
// 				text,
// 				isPublic,
// 				image,
// 				postid,
// 				postForm.getValues(),
// 			),
// 	);

// 	useEffect(() => {
// 		if (!updatedPost) return;
// 		return router.push('/dashboard');
// 	}, [updatedPost]);

// 	function handleSubmit(e) {
// 		e.preventDefault();
// 		if (postid) {
// 			triggerUpdate();
// 		}
// 	}
// 	return (
// 		<PostFormContainer isActive={isActive}>
// 			<StyledPostForm onSubmit={handleSubmit} encType='multipart/form-data'>
// 				<Label htmlFor='title'>Title </Label>
// 				<TitleInput
// 					type='text'
// 					name='title'
// 					onChange={handleChange}
// 					placeholder='Post title ...'
// 					value={title}
// 					maxLength='35'
// 				/>
// 				<br />

// 				<Label htmlFor='text'>Post </Label>
// 				<StyledEditor
// 					onInit={(_e: Event, editor: any) => (editorRef.current = editor)}
// 					init={{
// 						height: 600,
// 						width: 1200,
// 						elementpath: false,
// 						plugins: 'code',
// 						menubar: true,
// 					}}
// 					apiKey='k1kgs8qmzd0isvug3s4btubgrps7yutyhiy7jbsi038go8sq'
// 					name='html'
// 					value={formData.text}
// 					onEditorChange={(content, editor) => {
// 						handleEditorChange(parseEditorData(content, editor));
// 					}}
// 				/>

// 				<br />
// 				<FormBottomRow>
// 					<InputContainer>
// 						<Label htmlFor='image'>Attach an image</Label>
// 						<input
// 							style={{ display: 'none' }}
// 							type='file'
// 							name='image'
// 							id='image'
// 							onChange={handleImageChange}
// 						/>
// 						{image && <StyledFaCheck />}
// 					</InputContainer>
// 					<br />
// 					<ErrorMessage>
// 						Image size should not exceed 100 megabytes{' '}
// 					</ErrorMessage>
// 					<br />
// 					<BottomRight>
// 						<CheckBoxTitle>Make this post public</CheckBoxTitle>
// 						<CheckBoxContainer>
// 							<CheckBox
// 								type='checkbox'
// 								name='privacy'
// 								onChange={handlePrivacyChange}
// 								checked={isPublic}
// 							/>
// 							<CheckBoxLabel htmlFor='privacy'></CheckBoxLabel>
// 						</CheckBoxContainer>
// 						<br />

// 						<FormButton
// 							type='submit'
// 							disabled={isFormValid() || isUpdateLoading}
// 						>
// 							{isUpdateLoading ? (
// 								<Spinner />
// 							) : postid ? (
// 								'Update post'
// 							) : (
// 								'Submit post'
// 							)}
// 						</FormButton>
// 					</BottomRight>
// 				</FormBottomRow>
// 			</StyledPostForm>
// 		</PostFormContainer>
// 	);
// }
