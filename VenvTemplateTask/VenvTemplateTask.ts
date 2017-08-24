import tl = require('vsts-task-lib/task');
import venv = require('venv');

const templatePath: string = tl.getPathInput('templatePath', false, false);

async function run() {
  try {
    const venvo = new venv.EnvironmentTemplateHandler();
    const content = await venvo.renderEnvContextTemplateFile(
      templatePath.concat('.template'),
      process
    );
    tl.writeFile(templatePath, content);
    tl.setResult(tl.TaskResult.Succeeded, `${templatePath} processed`);
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
