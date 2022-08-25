import { Box, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

function CommentForm() {
  const router = useRouter();

  const permalink = router.query.permalink as string;

  const form = useForm({
    initialValues: {
      body: "",
    },
  });

  function handleSubmit(values: { body: string }) {}

  return (
    <Box mt="md" mb="md">
      <form>
        <Textarea
          required
          placeholder="Your spicey comment"
          label="Comment"
          {...form.getInputProps("body")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Post Comment</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CommentForm;
