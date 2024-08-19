import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { CREATE_ALBUM } from "../mutations/Mutations";
import { Alert, Spinner } from "react-bootstrap";

const CreateAlbumForm = () => {
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // useMutation works similarly to useQuery except it also returns a function that we need to call in order to execute our mutation (createAlbum)
  const [createAlbum, { data, loading, error }] = useMutation(CREATE_ALBUM);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert>
        <h1>ERROR! {error.message} </h1>
      </Alert>
    );
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createAlbum({
      variables: {
        title: title,
        userId: userId,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>User Id: </label>
        <input
          type="text"
          autoComplete="off"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <label>Title: </label>
        <input
          type="text"
          autoComplete="off"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {data && (
        <div>
          <h2>New Album: {data.createAlbum.title}</h2>
          <p>User: {data.createAlbum.user.name}</p>
          <p>ID: {data.createAlbum.id}</p>
          <p>UserID: {data.createAlbum.user.id}</p>
        </div>
      )}
    </>
  );
};

export default CreateAlbumForm;
