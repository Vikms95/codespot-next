/* eslint-disable react/prop-types */
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { StyledModalWrapper } from './_styles';
import { TChildren } from '@/types';

/**
 * Handles the logic on whether the modal should be rendered
 * and when rendered, wraps it on an invisible, full screen div
 * to make any element behind unclickable. If that div ever gets
 * clicked, change isModalActive prop to false.
 */

type Props = { isModalActive: boolean; handleCancel: () => void } & TChildren;

export function ModalWrapper({ children, isModalActive, handleCancel }: Props) {
	const isActive = useFadeIn();

	return (
		isModalActive && (
			<StyledModalWrapper onClick={handleCancel} isActive={isActive}>
				{children}
			</StyledModalWrapper>
		)
	);
}
