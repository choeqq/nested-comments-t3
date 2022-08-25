import { Box, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();

  const permalink = router.query.permalink as string;

  const { mutate, isLoading } = trpc.useMutation(["comments.add-comment"]);

  const form = useForm({
    initialValues: {
      body: "",
    },
  });

  function handleSubmit(values: { body: string }) {
    const payload = {
      ...values,
      permalink,
      parentId,
    };

    mutate(payload);
  }

  return (
    <Box mt="md" mb="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          required
          placeholder="Your spicey comment"
          label="Comment"
          {...form.getInputProps("body")}
        />
        <Group position="right" mt="md">
          <Button loading={isLoading} type="submit">
            {parentId ? "Post reply" : "Post Comment"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default CommentForm;
