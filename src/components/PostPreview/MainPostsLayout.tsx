import { SetState, TPost } from '@/types'
import MainPostPreview from './LazyMainPostPreview'
import SecondPostPreview from './LazySecondPostPreview'

type Props  = {
    posts: TPost[]
    setIsModalActive: SetState<boolean>;
	setLastClickedPostId: SetState<string>;
}

export function MainPostLayout({posts, setIsModalActive, setLastClickedPostId}: Props) {
    const { _id, user, text, title, image, timestamp } =  posts[0]
    const { _id: id2 } =  posts[1]
    return (
        <section className="grid grid-cols-8 md:gap-x-0 l:gap-x-5 lg:mx-20">
            <MainPostPreview 
                key={_id}
                id={_id}
                user={user}
                text={text}
                title={title}
                image={image}
                timestamp={timestamp}
                setIsModalActive={setIsModalActive}
                setLastClickedPostId={setLastClickedPostId}
            />
            <SecondPostPreview 
                key={id2}
                id={_id}
                user={user}
                text={text}
                title={title}
                image={image}
                timestamp={timestamp}
                setIsModalActive={setIsModalActive}
                setLastClickedPostId={setLastClickedPostId}
            />
        </section>
    )
}