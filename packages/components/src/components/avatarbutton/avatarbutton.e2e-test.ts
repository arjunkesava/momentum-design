import { test } from '../../../config/playwright/setup';

test.beforeEach(async ({ componentsPage }) => {
  await componentsPage.mount({
    html: `
        <mdc-avatarbutton />
      `,
  });
});

test.fixme('mdc-avatarbutton', async ({ componentsPage }) => {
  const avatarbutton = componentsPage.page.locator('mdc-avatarbutton');

  // initial check for the avatarbutton be visible on the screen:
  await avatarbutton.waitFor();

  /**
   * ACCESSIBILITY
   */
  await test.step('accessibility', async () => {
    await componentsPage.accessibility.checkForA11yViolations('avatarbutton-default');
  });

  /**
   * VISUAL REGRESSION
   */
  await test.step('visual-regression', async () => {
    await test.step('matches screenshot of element', async () => {
      await componentsPage.visualRegression.takeScreenshot('mdc-avatarbutton', { element: avatarbutton });
    });
  });

  /**
   * ATTRIBUTES
   */
  await test.step('attributes', async () => {
    await test.step('attribute X should be present on component by default', async () => {
      // TODO: add test here
    });
  });

  /**
   * INTERACTIONS
   */
  await test.step('interactions', async () => {
    await test.step('mouse/pointer', async () => {
      await test.step('component should fire callback x when clicking on it', async () => {
        // TODO: add test here
      });
    });

    await test.step('focus', async () => {
      await test.step('component should be focusable with tab', async () => {
        // TODO: add test here
      });

      // add additional tests here, like tabbing through several parts of the component
    });

    await test.step('keyboard', async () => {
      await test.step('component should fire callback x when pressing y', async () => {
        // TODO: add test here
      });
    });
  });
});