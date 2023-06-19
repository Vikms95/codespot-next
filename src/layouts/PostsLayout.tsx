/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useFadeIn } from '../hooks/useFadeIn';
import { TChildren } from '@/types';

const StyledPostsLayout = styled.section`
	max-width: 95%;
	gap: 5em;
	margin-bottom: 5em;
	opacity: ${props => (props.isActive ? 1 : 0)};
	transition: opacity 0.5s, visibility 0.5s linear;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(3.5rem, 1fr));

	grid-template-rows: ${props =>
		props.section === 'home'
			? 'repeat(1, 40rem) repeat(auto-fill, minmax(3rem, 1fr));'
			: 'repeat(auto-fill, minmax(3rem, 1fr));'};

	${props => {
		if (props.section === 'home') {
			return `
					> * {
						:nth-child(1) {
							grid-column: 1 / 8;
							min-height: 40rem;
              max-width: 55rem;

							& > article > a > img {
								height: 25rem;
							}
              
							& > article > svg {
								height: 25rem;
							}
						}
            
						:nth-child(2) {
              grid-column: 8 / 13;
							min-height: 40rem;
              max-width: 40rem;

							& > article > a > img {
                height: 25rem;
							}

              & > article > svg {
                height: 25rem;
              }
						}
					}

          @media screen and (max-width: 1485px) {
            grid-template-rows:repeat(auto-fill, minmax(3rem, 1fr));

            > * {
						:nth-child(1) {
              min-height: initial;
              max-width: 100%;
              grid-column: auto / span 4;


							& > article > a > img {
								height: 18em;
							}
              
							& > article > svg {
								height: 18em;
							}
						}
            
						:nth-child(2) {
              min-height: initial;
              max-width: 100%;
              grid-column: auto / span 4;

							& > article > a > img {
                height: 18em;
							}

              & > article > svg {
                height: 18em;
              }
						}
					}
          }
				`;
		}
	}};

	& > section {
		grid-column: auto / span 4;
	}

	@media screen and (max-width: 600px) {
		margin-left: 2rem;
	}
`;
const PostListTitle = styled.h2`
	font-size: 1.5em;
	@media screen and (max-width: 600px) {
		margin-left: 2rem;
	}
`;

type Props = { title: string; section: string } & TChildren;

export function PostsLayout({ children, title, section }: Props) {
	const isActive = useFadeIn();

	return (
		<>
			<PostListTitle section={section}>{title}</PostListTitle>

			<StyledPostsLayout section={section} isActive={isActive}>
				{children}
			</StyledPostsLayout>
		</>
	);
}
