Feature: Accordion Item Component

  Background:
    Given the Accordion Item component is rendered on the page
    And the item has role="button"
    And the item has default size="small"
    And the item contains:
      | Property       | Value              | State    |
      | -------------  | ------------------ | -------- |
      | Visible        | true/false         | Required |
      | Header Text    | string             | Required |
      | Leading Icon   | icon name          | Optional |
      | Leading Label  | string             | Optional |
      | Trailing Label | string             | Optional |
      | Disabled       | true/false         | Optional |

  Rule: ✅ Rendering and Visual States

    Scenario: Render accordion item with default settings
      Given the accordion item has default settings
      When the item is rendered
      Then the item should have proper ARIA attributes
      And the header text should be visible
      And the item should be collapsed by default

    Scenario: Render accordion item with leading icon
      Given the accordion item has a leading icon
      And the icon name is valid
      When the item is rendered
      Then the icon should be visible before the header text
      And the icon should be properly aligned

    Scenario: Render accordion item with labels
      Given the accordion item has leading and trailing labels
      When the item is rendered
      Then both labels should be visible as chips
      And the labels should be properly positioned

  Rule: ✅ User Interaction

    Scenario: Clicking accordion item header
      Given the accordion item is rendered
      When clicking the header
      Then the item should toggle visibility
      And a header-click event should be dispatched
      And ARIA-expanded state should be updated

    Scenario: Keyboard navigation
      Given the accordion item is focused
      When pressing enter or space
      Then the item should toggle visibility
      And a header-click event should be dispatched
      And focus should remain on the item

    Scenario: Programmatic control
      Given the accordion item is rendered
      When programmatically setting visible state
      Then the item should toggle visibility
      And ARIA-expanded state should be updated
      And the UI should reflect the change

  Rule: ✅ Accessibility

    Scenario: ARIA attributes
      Given the accordion item is rendered
      Then the header should have role="button"
      And proper ARIA-controls should be set
      And proper ARIA-expanded states should be maintained
      And proper ARIA-disabled states should be set

    Scenario: Keyboard accessibility
      Given the accordion item is focused
      When using keyboard navigation
      Then focus should be properly managed
      And keyboard shortcuts should work
      And screen reader announcements should be correct

    Scenario: Disabled state
      Given the accordion item is disabled
      When interacting with the item
      Then the item should not respond to clicks
      And keyboard navigation should skip the item
      And proper ARIA-disabled states should be set

  Rule: ✅ Size Variants

    Scenario: Different sizes
      Given the accordion item has size="small"
      When the item is rendered
      Then the item should have proper sizing
      And the layout should be compact
      And text should be properly scaled

  Rule: ✅ Event Handling

    Scenario: Header click event
      Given the accordion item is rendered
      When clicking the header
      Then a header-click event should be dispatched
      And the event should bubble up
      And the event should be cancelable

  Rule: ✅ Content Slots

    Scenario: Default slot content
      Given the accordion item has content in the default slot
      When the item is expanded
      Then the content should be visible
      And the content should be properly positioned
      And the content should be accessible

    Scenario: Empty content
      Given the accordion item has no content
      When the item is expanded
      Then the item should still be visible
      And proper ARIA states should be maintained

  Rule: ✅ State Management

    Scenario: Initial visibility state
      Given the accordion item is rendered with visible=true
      When the component initializes
      Then the item should be expanded
      And ARIA-expanded state should be true
      And content should be visible

    Scenario: Toggle state persistence
      Given the accordion item is rendered
      When toggling visibility multiple times
      Then the state should persist
      And ARIA states should be properly updated
      And the UI should reflect the state changes

  Rule: ✅ Error Handling

    Scenario: Invalid icon name
      Given the accordion item has an invalid icon name
      When the item is rendered
      Then the icon should not be displayed
      And no error should be thrown
      And the item should render properly without the icon

    Scenario: Missing header text
      Given the accordion item is rendered without header text
      Then the item should still be rendered
      And proper ARIA states should be maintained
      And the item should be focusable

  Rule: ✅ Performance

    Scenario: Multiple accordion items
      Given multiple accordion items are rendered
      When interacting with one item
      Then other items should not be affected
      And performance should be optimal
      And event handling should be efficient

    Scenario: Large content
      Given an accordion item with large content
      When expanding the item
      Then the content should be properly rendered
      And scrolling should work
      And performance should be maintained
