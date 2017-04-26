//follow arg should include follow_id and followable_id
export const createFollow = (follow) => {
  return $.ajax({
    method: "POST",
    url: "api/follows",
    data: { follow }
  });
};

export const deleteFollow = (followId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/follows/${followId}`
  });
};
