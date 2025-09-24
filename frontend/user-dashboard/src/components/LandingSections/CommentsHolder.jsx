import CommentCard from './CommentCard'
const CommentsHolder = ({ref}) => {
    return (
        <div className="flex justify-between gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 " ref={ref}>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
        </div>
    )
}

export default CommentsHolder
