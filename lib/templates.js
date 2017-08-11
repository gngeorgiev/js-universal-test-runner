const handlebars = require('handlebars');
const fs = require('fs-extra');

const processTemplateFile = (file, data, output) => {
    output = output || file.replace('.template', '');

    const templateData = fs.readFileSync(file, 'utf8');
    const template = handlebars.compile(templateData);
    const result = template(data);

    fs.writeFileSync(output, result);
};

module.exports = { processTemplateFile };
