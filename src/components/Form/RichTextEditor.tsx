import { EDITOR_API_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { parseEditorData } from '@/utils/parseEditorData';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type Props = {
	text?: string;
	control: {
		field: ControllerRenderProps<
			{
				image: string;
				text: string;
				title: string;
				isPublic: boolean;
			},
			'text'
		>;
	};
};

export function RichTextEditor({ control, text }: Props) {
	const editorRef = useRef<Editor>(null!);
	const { windowDimensions } = useWindowDimensions();

	const initObject = {
		menubar: true,
		plugins: 'code',
		elementpath: false,
		width: windowDimensions.width / 1.25,
		height: windowDimensions.height / 1.75,
	};

	return (
		<Editor
			name='html'
			initialValue={text}
			init={initObject}
			apiKey={EDITOR_API_KEY}
			// @ts-expect-error
			onInit={(_: Event, editor: any) => (editorRef.current = editor)}
			{...control}
			onEditorChange={(content, editor) => {
				control.field.onChange(parseEditorData(content, editor));
			}}
		/>
	);
}
