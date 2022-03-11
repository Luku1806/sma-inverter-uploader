export const NoIDAndVersionSchemaOptions = {
  toJSON: {
    transform: removeMongooseId,
  },
  toObject: {
    transform: removeMongooseId,
  },
  versionKey: false,
};

function removeMongooseId(document: any, record: any) {
  delete record._id;
  return record;
}
