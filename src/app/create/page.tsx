'use client';
import { EDITOR_API_KEY } from '@/constants';
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
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { postFields, postSchema } from '../../data/formFields';
import { Label } from '../../style/Label';
import { Spinner } from '../../style/Spinner';
import { parseEditorData } from '../../utils/parseEditorData';
import {
	CheckBox,
	CheckBoxLabel,
	ErrorMessage,
	FormButton,
	StyledEditor,
	StyledFaCheck,
	TitleInput,
} from './_styles';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';
import { Editor } from '@tinymce/tinymce-react';
import { FaCheck } from 'react-icons/fa';

export default function PostForm() {
	const isActive = useFadeIn();
	const router = useRouter();
	const { postid } = useParams();
	const editorRef = useRef(null);
	const { user } = useAuthContext();
	const { posts, setPosts } = usePostsContext();
	const imageInputRef = useRef<HTMLInputElement>(null);

	const postForm = useForm<z.infer<typeof postSchema>>({
		resolver: zodResolver(postSchema),
		defaultValues: postFields,
	});

	const {
		data: createdPost,
		isMutating: isCreateLoading,
		trigger: triggerCreate,
	} = useSWRMutation('/api/post', () =>
		createPost(user, title, text, isPublic, image),
	);

	const {
		data: updatedPost,
		isMutating: isUpdateLoading,
		trigger: triggerUpdate,
	} = useSWRMutation(`/api/post/${postid}`, () =>
		updatePost(
			user,
			title,
			text,
			isPublic,
			image,
			postid,
			postForm.getValues(),
		),
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

	function handleSubmit() {
		if (postid) {
			triggerUpdate();
		} else {
			triggerCreate();
		}
	}

	const { text, title, isPublic, image } = postForm.getValues();

	return (
		<section
			className='mx-auto flex w-10/12 flex-1 justify-start bg-white sm:my-6 lg:my-4'
			// isActive={isActive}
		>
			<Form data-testid='post-form' encType='multipart/form-data' {...postForm}>
				<form onSubmit={postForm.handleSubmit(async () => handleSubmit())}>
					<FormField
						control={postForm.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
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
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Editor
										onInit={(_: Event, editor: any) =>
											(editorRef.current = editor)
										}
										init={{
											height: 600,
											width: 1200,
											elementpath: false,
											plugins: 'code',
											menubar: true,
										}}
										apiKey={EDITOR_API_KEY}
										// name='html'
										{...field}
										onEditorChange={(content, editor) => {
											field.onChange(parseEditorData(content, editor));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<br />

					<article className='flex items-center justify-between'>
						<div className='flex flex-row justify-center gap-x-3 gap-y-2'>
							<>
								<FormField
									control={postForm.control}
									name='image'
									render={({ field }) => (
										<FormItem>
											<FormLabel
												onClick={() => imageInputRef.current.click()}
												className='cursor-pointer text-main-orange'
											>
												Attach an image
											</FormLabel>
											<FormControl>
												<Input
													className='invisible w-10'
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

						<ErrorMessage>
							Image size should not exceed 100 megabytes{' '}
						</ErrorMessage>
						<br />
						<div className='flex justify-end'>
							<div className='mr-1 flex items-center'>
								Make this post public
							</div>
							<div className='relative mt-[0.2rem] self-start'>
								{/* Check how to do this with the class group */}
								<CheckBox
									type='checkbox'
									name='privacy'
									// onChange={handlePrivacyChange}
									checked={isPublic}
								/>
								<CheckBoxLabel htmlFor='privacy'></CheckBoxLabel>
							</div>
							<br />

							<FormButton
								type='submit'
								// disabled={isFormValid() || isCreateLoading || isUpdateLoading}
							>
								{isCreateLoading || isUpdateLoading ? (
									<Spinner />
								) : postid ? (
									'Update post'
								) : (
									'Submit post'
								)}
							</FormButton>
						</div>
					</article>
				</form>
			</Form>
		</section>
	);
}
