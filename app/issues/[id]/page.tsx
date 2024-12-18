import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import dynamic from "next/dynamic";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap={"5"}>
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <Flex gap={"4"} direction={"column"}>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
