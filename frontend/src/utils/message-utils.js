export const newMessage = (data, setState) => {
  setState((prev) => [...prev, data]);
};

export const newUpdatedMessage = (data, setState) => {
  setState((prev) =>
    prev.map((message) =>
      message.message_id === data.message_id ? data : message
    )
  );
};

export const newDeletedMessage = (data, setState) => {
  setState((prev) =>
    prev.filter((message) => message.message_id !== data.message_id)
  );
};
