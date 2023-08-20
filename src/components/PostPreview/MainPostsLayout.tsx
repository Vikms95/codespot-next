import { SetState, TPost } from '@/types'
import MainPostPreview from './LazyMainPostPreview'
import SecondPostPreview from './LazySecondPostPreview'
import { useFadeIn } from '@/hooks/useFadeIn'
import clsx from 'clsx'

type Props  = {
    posts: TPost[]
    setIsModalActive: SetState<boolean>;
	setLastClickedPostId: SetState<string>;
}

export function MainPostLayout({posts, setIsModalActive, setLastClickedPostId}: Props) {
	const isActive = useFadeIn();
    const { _id: id1 } =  posts[0]
    const { _id: id2 } =  posts[1]
    
    return (
        <section className={clsx("grid grid-cols-8 md:gap-x-0 l:gap-x-5 opacity-0 duration-500 ease-linear", isActive && 'opacity-100')}>
            <MainPostPreview 
                key={id1}
                id={id1}
                {...posts[0]}
                setIsModalActive={setIsModalActive}
                setLastClickedPostId={setLastClickedPostId}
                />
            <SecondPostPreview 
                key={id2}
                id={id2}
                {...posts[1]}
                setIsModalActive={setIsModalActive}
                setLastClickedPostId={setLastClickedPostId}
            />
        </section>
    )
}