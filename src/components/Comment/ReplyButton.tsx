import React from 'react';
import { FaReply } from 'react-icons/fa';
import { IconButton } from './_styles';
import { TSetter } from '@/types';

type Props = {
	setIsFormActive?: TSetter<boolean>;
	isFormActive?: boolean;
};

export function ReplyButton({ isFormActive, setIsFormActive }: Props) {
	return (
		<IconButton
			onClick={() => setIsFormActive && setIsFormActive(true)}
			isActive={isFormActive}
			role='button'
			aria-label={isFormActive ? 'Cancel reply' : 'Reply'}
		>
			<FaReply />
		</IconButton>
	);
}
