"use client";

import { useActionState } from "react";
import { CheckCircle2Icon, FileUpIcon, SparklesIcon } from "lucide-react";

import { processFilePdfFile } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

type UploadState = {
  success: boolean;
  message: string;
  error: string;
};

const initialState: UploadState = {
  success: false,
  message: "",
  error: "",
};

export default function Page() {
  const [state, formAction, isPending] = useActionState(
    async (
      _previousState: UploadState,
      formData: FormData,
    ): Promise<UploadState> => {
      const result = await processFilePdfFile(formData);

      return {
        success: result.success,
        message: result.message ?? "",
        error: result.error ?? "",
      };
    },
    initialState,
  );

  const hasFeedback = Boolean(state.message || state.error);

  return (
    <div className="min-h-dvh bg-linear-to-b from-muted/70 via-background to-background">
      <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8 lg:py-14">
        <section className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit gap-2 px-3 py-1">
            <SparklesIcon />
            PDF ingestion
          </Badge>
          <div className="flex max-w-3xl flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Upload a PDF and turn it into searchable chunks.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Drop in a document, let the server extract text, chunk the
              content, and store embeddings for retrieval.
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <Card>
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
              <CardDescription>
                Choose a single PDF file. The form posts directly to the server
                action for processing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="pdf-upload-form"
                key={state.message || state.error || "idle"}
                action={formAction}
                className="flex flex-col gap-6"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="pdf">Document</FieldLabel>
                    <FieldContent>
                      <Input
                        id="pdf"
                        name="pdf"
                        type="file"
                        accept="application/pdf,.pdf"
                        required
                      />
                      <FieldDescription>
                        Only PDF files are supported. Uploaded documents are
                        parsed on the server and stored as embeddings.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>

                {hasFeedback ? (
                  <Alert variant={state.error ? "destructive" : "default"}>
                    {state.success ? <CheckCircle2Icon /> : <FileUpIcon />}
                    <AlertTitle>
                      {state.success ? "Upload complete" : "Upload failed"}
                    </AlertTitle>
                    <AlertDescription>
                      {state.success ? state.message : state.error}
                    </AlertDescription>
                  </Alert>
                ) : null}

                <Separator />
              </form>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                The file is processed as soon as you submit the form.
              </p>
              <Button form="pdf-upload-form" type="submit" disabled={isPending}>
                {isPending ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <FileUpIcon data-icon="inline-start" />
                )}
                {isPending ? "Processing PDF" : "Upload PDF"}
              </Button>
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>What happens next</CardTitle>
              <CardDescription>
                The upload flow is intentionally simple so it is easy to extend.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                  <FileUpIcon />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">1. Select a PDF</p>
                  <p className="text-sm text-muted-foreground">
                    The browser sends the file in a standard multipart form.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                  <SparklesIcon />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">2. Extract and chunk</p>
                  <p className="text-sm text-muted-foreground">
                    The server reads the PDF text and breaks it into searchable
                    chunks.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                  <CheckCircle2Icon />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">3. Store embeddings</p>
                  <p className="text-sm text-muted-foreground">
                    Chunk embeddings are saved for downstream retrieval and
                    chat.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
