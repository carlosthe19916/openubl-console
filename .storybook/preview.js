import "../src/App.scss";

import { addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

addDecorator(withInfo());
addParameters({ info: { inline: true } });
