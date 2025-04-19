import { registerApplication, start } from "single-spa";

interface MfeApp {
  name: string;
  activeWhen: (location: Location) => boolean;
  domElement: string;
}

const mfeApps: MfeApp[] = [
  {
    name: "@mfe/sidebar",
    activeWhen: (location) => location.pathname.startsWith("/"),
    domElement: "sidebar",
  },
  {
    name: "@mfe/header",
    activeWhen: (location) => location.pathname.startsWith("/"),
    domElement: "header",
  },
  {
    name: "@mfe/user",
    activeWhen: (location) => location.pathname.startsWith("/"),
    domElement: "main",
  },
];

for (const { name, activeWhen, domElement } of mfeApps) {
  registerApplication(
    name,
    async () => {
      const module = await System.import(name);
      if (!module.bootstrap || !module.mount || !module.unmount) {
        throw new Error(
          `Module for ${name} does not export expected lifecycle functions.`
        );
      }
      return {
        bootstrap: module.bootstrap,
        mount: module.mount,
        unmount: module.unmount,
      };
    },
    activeWhen,
    { domElement: document.getElementById(domElement) }
  );
}

start({
  urlRerouteOnly: true,
});
