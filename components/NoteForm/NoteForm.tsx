"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { CreateNotePayload } from "@/types/note";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      console.error("CREATE NOTE ERROR:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
      onClose();
    },
  });

  return (
    <Formik<CreateNotePayload>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form className={css.form}>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" component="div" />

        <Field as="textarea" name="content" placeholder="Content" />
        <ErrorMessage name="content" component="div" />

        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={mutation.isPending}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
