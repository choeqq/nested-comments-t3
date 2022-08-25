import { Comment, CommentWithChildren } from "../utils/trpc";

function formatComments(comments: Array<Comment>) {
  const map = new Map();

  const roots: Array<CommentWithChildren> = [];

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id;

    map.set(commentId, i);

    (comments[i] as CommentWithChildren).children = [];

    if (typeof comments[i]?.parentId === "string") {
      const parentsCommentIndex: number = map.get(comments[i]?.parentId);

      (comments[parentsCommentIndex] as CommentWithChildren).children.push(
        comments[i] as CommentWithChildren
      );

      continue;
    }

    roots.push(comments[i] as CommentWithChildren);
  }

  return roots;
}

export default formatComments;
