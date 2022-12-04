const { schema, normalize, denormalize } = require("normalizr")

const messasgeNormalize = (messages) => {

    const message = new schema.Entity('text');
    const author = new schema.Entity('author');
    const finalSchema = new schema.Entity('author', {
        author: author,
        text: [message]
    }, { idAttribute: 'id' });
    const authorListSchema = finalSchema;

    const normalizedData = normalize(messages, authorListSchema);
    //const desnormalizedData = denormalize(normalizedData.entities.author, authorListSchema, normalizedData.entities);

    return normalizedData.entities.author.undefined;
}

module.exports = {
    messasgeNormalize
};