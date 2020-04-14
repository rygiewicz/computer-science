function Project(name) {
  this.name = name;
  this.dependencies = [];
  this.installed = false;
  this.touched = false;
}

function installProjects(projectList) {
  const log = [];

  projectList.forEach((project) => {
    if (!project.installed) {
      install(project, log);
    }
  });

  return log;
}

function install(project, log) {
  if (project.touched) {
    throw new Error('Circular dependency detected');
  }

  project.touched = true;

  project.dependencies.forEach((dep) => {
    if (!dep.installed) {
      install(dep, log);
    }
  });

  __install(project);

  log.push(project);
}

function __install(project) {
  project.installed = true;
}

test();

function test() {
  shouldInstallInCorrectOrder();
  shouldDetectCircularDependency();
}

function shouldInstallInCorrectOrder() {
  const a = new Project('A');
  const b = new Project('B');
  const c = new Project('C');
  const d = new Project('D');
  const e = new Project('E');
  const f = new Project('F');

  d.dependencies.push(a);
  b.dependencies.push(f);
  d.dependencies.push(b);
  a.dependencies.push(f);
  c.dependencies.push(d);

  const result = installProjects([a, b, c, d, e, f]);

  if (!result || result.length !== 6) {
    throw new Error('shouldInstallInCorrectOrder');
  }

  console.log('OK');
}

function shouldDetectCircularDependency() {
  const a = new Project('A');
  const b = new Project('B');
  const c = new Project('C');
  const d = new Project('D');
  const e = new Project('E');
  const f = new Project('F');

  d.dependencies.push(a); // circular
  b.dependencies.push(f);
  d.dependencies.push(b);
  a.dependencies.push(d); // circular
  a.dependencies.push(f);
  c.dependencies.push(d);

  let error;

  try {
    installProjects([a, b, c, d, e, f]);
  } catch (e) {
    error = e;
  }

  if (!error) {
    throw new Error('shouldDetectCircularDependency');
  }

  console.log('OK');
}
