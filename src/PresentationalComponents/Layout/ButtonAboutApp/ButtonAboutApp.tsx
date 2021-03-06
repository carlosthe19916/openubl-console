import * as React from "react";
import {
  AboutModal,
  TextContent,
  TextList,
  TextListItem,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import brandImage from "../../../logo.png";

export interface ButtonAboutProjectProps {}

interface State {
  isOpen: boolean;
}

export class ButtonAboutApp extends React.Component<
  ButtonAboutProjectProps,
  State
> {
  constructor(props: ButtonAboutProjectProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleButton = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Button
          id="aboutButton"
          aria-label="About button"
          variant={ButtonVariant.plain}
          onClick={this.toggleButton}
        >
          <HelpIcon />
        </Button>
        <AboutModal
          isOpen={isOpen}
          onClose={this.toggleButton}
          trademark="COPYRIGHT © 2020."
          brandImageSrc={brandImage}
          brandImageAlt="Logo"
          productName="Project OpenUBL Web Console"
        >
          <TextContent>
            <TextList component="dl">
              <TextListItem component="dt">Source code</TextListItem>
              <TextListItem component="dd">
                <a href="https://github.com/project-openubl">Github</a>
              </TextListItem>
            </TextList>
          </TextContent>
        </AboutModal>
      </React.Fragment>
    );
  }
}
