import { Avatar, Box, Group, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { trpc, Comment as CommentWithChildren } from "../../utils/trpc";

function Comment({ comment }: { comment: CommentWithChildren }) {
  return (
    <Paper withBorder radius="md" mb="md" p="md">
      <Box
        sx={() => ({
          display: "flex",
        })}
      >
        <Avatar />

        <Box
          pl="md"
          sx={() => ({
            display: "flex",
            flexDirection: "column",
          })}
        >
          <Group>
            <Text>{comment.user.name}</Text>
            <Text>{comment.createdAt.toISOString()}</Text>
          </Group>

          {comment.body}
        </Box>
      </Box>
    </Paper>
  );
}

function ListComments() {
  const router = useRouter();

  const permalink = router.query.permalink as string;

  const { data } = trpc.useQuery(["comments.all-comments", { permalink }]);

  return (
    <Box>
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </Box>
  );
}

export default ListComments;
