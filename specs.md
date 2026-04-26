# FUNCTIONAL SPECIFICATIONS: WORKOUT ENGINE

## 1. DATA PROCESSING & QUEUE
- **Initialization**: When a routine is selected, the engine must parse the JSON and expand all blocks based on their `rounds` property.
- **Example**: If a block has 3 exercises and `rounds: 4`, the queue must contain those 3 exercises repeated 4 times sequentially.

## 2. STATE MACHINE FLOW
The application must transition through these states strictly:
1. **SELECT_DAY**: User picks Day 1-4.
2. **SUMMARY**: Show exercises and equipment list.
3. **PREPARING**: 5-second countdown before EVERY exercise.
4. **EXECUTING**: The active workout phase.
5. **PAUSED**: Timer frozen, overlay menu visible (Resume/Quit).
6. **FINISHED**: Completion message and return to Home.

## 3. EXERCISE EXECUTION LOGIC
- **Timed Exercises (`type: timed`)**: 
    - Display MM:SS countdown from `duration` to 00:00.
    - Auto-advance to next `PREPARING` state when time hits 0.
- **Rep Exercises (`type: reps`)**: 
    - Display the `goal` text (e.g., "15 reps") and the `description`.
    - Do NOT show a clock.
    - Wait for manual user trigger (e.g., a "DONE" button) to advance.

## 4. UI REQUIREMENTS (ACTIVE WORKOUT)
- **MM:SS Formatter**: Implement a utility function `formatTime(seconds)` that returns `00:00` format.
- **Top Bar**: Always visible `exercise.name` and `exercise.description`.
- **Center Stage**: 
    - If `timed`: Large MM:SS numbers.
    - If `reps`: Large Goal text + "Done" button.
- **Controls**: A prominent "Pause" button at the bottom.

## 5. INTERRUPTION LOGIC
- **Pause**: `clearInterval` must be called immediately.
- **Resume**: Re-calculate the remaining time and restart `setInterval`.
- **Quit**: Use `Maps('/')` to reset all state and return to Home.