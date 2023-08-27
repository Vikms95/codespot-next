import { EDITOR_API_KEY } from '@/constants';
import { postFields } from '@/data/formFields';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { parseEditorData } from '@/utils/parseEditorData';
import { Editor } from '@tinymce/tinymce-react';
import { Ref, useRef } from 'react';
import { useController, Control } from 'react-hook-form';

type Props = {
	control: Control<typeof postFields>;
};

export function RichTextEditor({ control }: Props) {
	const editorRef = useRef<Editor>(null!);
	const { windowDimensions } = useWindowDimensions();
	const { field } = useController({
		name: 'text',
		control,
		defaultValue: '',
		rules: {
			minLength: 35,
			validate: value => {
				console.warn('FILTER', value);

				return true;
			},
		},
	});

	const initObject = {
		menubar: true,
		plugins: 'code',
		elementpath: false,
		width: windowDimensions.width / 1.25,
		height: windowDimensions.height / 1.75,
	};

	return (
		<Editor
			// @ts-expect-error
			init={initObject}
			name='html'
			apiKey={EDITOR_API_KEY}
			onInit={(_: Event, editor: any) => (editorRef.current = editor)}
			onEditorChange={(content, editor) => {
				field.onChange(parseEditorData(content, editor));
				console.warn('FILTER', field.ref);
			}}
		/>
	);
}
