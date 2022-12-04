const messasgeDenormalize = (messages) => {
    const message = new normalizr.schema.Entity('text');
    const author = new normalizr.schema.Entity('author');
    const finalSchema = new normalizr.schema.Entity('author', {
        author: author,
        text: [message]
    }, { idAttribute: 'id' });
    const authorListSchema = finalSchema;
    const messagesDenormalized = (normalizr.denormalize(messages, authorListSchema, { author: { } }))
    return Object.keys(messagesDenormalized).map((key) => { return messagesDenormalized[key] });
}