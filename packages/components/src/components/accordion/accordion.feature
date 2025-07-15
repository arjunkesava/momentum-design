Feature: Accordion Component

  Background:
    Given the Accordion component is rendered on the page
    And the accordion has role="region"
    And the accordion has default variant="stacked"
    And the accordion contains:
      | Property       | Value              | State    |
      | -------------  | ------------------ | -------- |
      | Allow Multiple | true/false         | Optional |
      | Variant        | stacked            | Required |
      | Size           | small/medium       | Required |
      | Items          | Array of items     | Required |

  Rule: ✅ Rendering and Visual States

    Scenario: Render accordion with default settings
      Given the accordion has default settings
      When the accordion is rendered
      Then the accordion should have proper ARIA attributes
      And the accordion should have default variant and size
      And the accordion items should be properly stacked

    Scenario: Render accordion with multiple items
      Given the accordion has multiple items
      And each item has unique header text
      When the accordion is rendered
      Then all items should be visible
      And each item should have proper ARIA attributes
      And items should be properly stacked vertically

    Scenario: Render accordion with allowMultiple=false
      Given the accordion has allowMultiple=false
      And multiple items are visible
      When the accordion is rendered
      Then only one item should be visible at a time
      And clicking other items should hide previously visible items

  Rule: ✅ User Interaction

    Scenario: Clicking accordion item header
      Given the accordion has multiple items
      And one item is visible
      When clicking an item's header
      Then that item should become visible
      And if allowMultiple=false, other items should become hidden
      And a header-click event should be dispatched

    Scenario: Keyboard navigation
      Given the accordion is focused
      When using arrow keys to navigate
      Then focus should move between items
      And space/enter should toggle item visibility
      And proper ARIA attributes should be updated

    Scenario: Programmatic control
      Given the accordion has multiple items
      When programmatically setting item visibility
      Then the item should toggle visibility
      And ARIA attributes should be updated
      And the UI should reflect the change

  Rule: ✅ Accessibility

    Scenario: ARIA attributes
      Given the accordion is rendered
      Then each item should have proper ARIA attributes
      And the header should have role="button"
      And the content should have role="region"
      And proper ARIA-expanded states should be set

    Scenario: Keyboard accessibility
      Given the accordion is focused
      When using keyboard navigation
      Then focus should be properly managed
      And keyboard shortcuts should work
      And screen reader announcements should be correct

    Scenario: Disabled state
      Given the accordion has disabled items
      When interacting with disabled items
      Then the items should not respond to clicks
      And keyboard navigation should skip disabled items
      And proper ARIA-disabled states should be set

  Rule: ✅ Size and Variant

    Scenario: Different sizes
      Given the accordion has size="small"
      When the accordion is rendered
      Then the items should have proper sizing
      And the layout should be compact

    Scenario: Different variants
      Given the accordion has variant="inset-rectangle"
      When the accordion is rendered
      Then the items should have proper styling
      And the layout should match the variant

  Rule: ✅ Event Handling

    Scenario: Header click event
      Given the accordion has items
      When clicking an item's header
      Then a header-click event should be dispatched
      And the event should contain visibility state
      And the event should bubble up
