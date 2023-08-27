import { EDITOR_API_KEY } from '@/constants';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { parseEditorData } from '@/utils/parseEditorData';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type Props = {
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

export function RichTextEditor({ control }: Props) {
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
			// @ts-expect-error
			init={initObject}
			apiKey={EDITOR_API_KEY}
			onInit={(_: Event, editor: any) => (editorRef.current = editor)}
			{...control}
			onEditorChange={(content, editor) => {
				control.field.onChange(parseEditorData(content, editor));
			}}
		/>
	);
}
