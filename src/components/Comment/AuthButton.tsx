/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { FaPen } from 'react-icons/fa';
import { IconButton, StyledFaTrash } from './_styles';
import { TSetter } from '@/types';

type Props = {
	handleDelete?: () => void;
	setIsFormActive?: TSetter<boolean>;
	isFormActive?: boolean;
};

export function AuthButton({
	handleDelete,
	setIsFormActive,
	isFormActive,
}: Props) {
	return (
		<>
			<IconButton
				onClick={() => setIsFormActive && setIsFormActive(true)}
				isActive={isFormActive}
				role='button'
				aria-label={isFormActive ? 'Cancel edit' : 'Edit'}
			>
				<FaPen />
			</IconButton>
			<IconButton onClick={handleDelete}>
				<StyledFaTrash />
			</IconButton>
		</>
	);
}
