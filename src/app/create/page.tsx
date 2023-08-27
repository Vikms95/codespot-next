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
import { Switch } from '@/components/ui/switch';
import { Editor } from '@tinymce/tinymce-react';
import { FaCheck } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

export default function PostForm() {
	const isActive = useFadeIn();
	const router = useRouter();
	const { postid } = useParams();
	const editorRef = useRef(null);
	const { user } = useAuthContext();
	const { posts, setPosts } = usePostsContext();
	const imageInputRef = useRef<HTMLInputElement>(null!);
	const { windowDimensions } = useWindowDimensions();

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
			className='flex w-10/12 items-center justify-center bg-white sm:mx-auto sm:my-5 lg:my-8'
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
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Editor
										onInit={(_: Event, editor: any) =>
											(editorRef.current = editor)
										}
										init={{
											height: windowDimensions.height / 2,
											width: windowDimensions.width / 1.25,
											elementpath: false,
											plugins: 'code',
											menubar: true,
										}}
										// name='html'
										apiKey={EDITOR_API_KEY}
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

					<article className='flex flex-wrap justify-between'>
						<div className='flex flex-row justify-center'>
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

						<div className='flex content-start justify-end gap-x-5'>
							<FormField
								control={postForm.control}
								name='isPublic'
								render={({ field }) => (
									<FormItem className='flex gap-x-5 rounded-lg '>
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
								disabled={isCreateLoading || isUpdateLoading}
							>
								{isCreateLoading || isUpdateLoading ? (
									<Spinner />
								) : postid ? (
									'Update post'
								) : (
									'Submit post'
								)}
							</Button>
						</div>
					</article>
				</form>
			</Form>
		</section>
	);
}
