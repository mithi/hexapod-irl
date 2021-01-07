# Three example test code

-   Send messages with command prompt
-   Send servo degrees via command prompt
-   Three nodes

# Test #1: Send messages with command prompt

Open two terminals. Run `node-johnny` first, then `node-raw-input` second.

```bash
# on the first terminal
node node-johnny.js

# on the second terminal
node node-raw-input.js

```

You can input anything in the second terminal and it will show in the first terminal.

## Node Raw Input

```bash
$ node node-raw-input.js
Command: This is my first message to johnny
.............
{ timetoken: '16091545569629212' }
Command: This is my second message
.............
{ timetoken: '16091545862258817' }
Command:
```

## Node Johnny

```bash

node node-johnny.js
1609154508681 Available /dev/tty.usbserial-ADAOFIPEd
1609154508688 Connected /dev/tty.usbserial-ADAOFIPEd
1609154510413 Repl Initialized
>> .....Connected.....
....status.....

category:  {
  category: 'PNConnectedCategory',
  operation: 'PNSubscribeOperation',
  affectedChannels: [ 'hello_world' ],
  subscribedChannels: [ 'hello_world' ],
  affectedChannelGroups: [],
  lastTimetoken: 0,
  currentTimetoken: '16091543017994488'
}
published:  { timetoken: '16091545143314027' }

.........message......
received in:  johnny-five-node-uuid
{ title: 'this message is from: ', uuid: 'johnny-five-node-uuid' }
.....presence.......
action:  join
uuid:  johnny-five-node-uuid
channel:  hello_world

.........message......
received in:  johnny-five-node-uuid
{
  title: 'this message is from: ',
  uuid: 'raw-input-uuid',
  answer: 'This is my first message to johnny'
}

.........message......
received in:  johnny-five-node-uuid
{
  title: 'this message is from: ',
  uuid: 'raw-input-uuid',
  answer: 'This is my second message'
}

```

# Test #2: Send servo degrees via command prompt

Open two terminals. Run `node-johnny-servo` first, then `node-raw-input-servo` second.

```bash
# on the first terminal
node node-johnny-servo.js

# on the second terminal
node node-raw-input-servo.js

```

## Node Johnny Servo

```bash
node node-johnny-servo.js
1609162090989 Available /dev/tty.usbserial-ADAOFIPEd
1609162091019 Connected /dev/tty.usbserial-ADAOFIPEd
1609162092744 Repl Initialized
>> .....Connected.....
...setServo....
message:  { degrees: 45, from: 'raw-input-uuid-servo' }
degrees:  45
...setServo....
message:  { degrees: 0, from: 'raw-input-uuid-servo' }
...setServo....
message:  { degrees: 1, from: 'raw-input-uuid-servo' }
degrees:  1
```

## Node Raw Input Servo

```bash
node node-raw-input-servo.js
Enter a number between 0 and 180: 45
{ timetoken: '16091621117872439' }
Enter a number between 0 and 180: 0
{ timetoken: '16091621153795331' }
Enter a number between 0 and 180: 1
{ timetoken: '16091621188468294' }
```

# Test #3: Three nodes

Open three terminals, and run the commands respectively, start running `node-johnny` first and `node-2` last

```bash
# on the first terminal
node node-johnny.js

# on the second terminal
node node-1.js

# on the third terminal
node node-2.js

```

## Node Johnny

```
node node-johnny.js
1609152154061 Available /dev/tty.usbserial-ADAOFIPEd
1609152154071 Connected /dev/tty.usbserial-ADAOFIPEd
1609152155799 Repl Initialized
>> .....Connected.....
....status.....

category:  {
  category: 'PNConnectedCategory',
  operation: 'PNSubscribeOperation',
  affectedChannels: [ 'hello_world' ],
  subscribedChannels: [ 'hello_world' ],
  affectedChannelGroups: [],
  lastTimetoken: 0,
  currentTimetoken: '16091521451348742'
}
published:  { timetoken: '16091521566418009' }

.........message......
received in:  johnny-five-node-uuid
{ title: 'this message is from: ', uuid: 'johnny-five-node-uuid' }
.....presence.......
action:  join
uuid:  johnny-five-node-uuid
channel:  hello_world

.........message......
received in:  johnny-five-node-uuid
{ title: 'this message is from: ', uuid: 'first-node-uuid' }
.....presence.......
action:  join
uuid:  first-node-uuid
channel:  hello_world

.........message......
received in:  johnny-five-node-uuid
{ title: 'this message is from: ', uuid: 'second-node-uuid' }
.....presence.......
action:  join
uuid:  second-node-uuid
channel:  hello_world
```

## Node 1

```
node node-1.js
....status.....

category:  {
  category: 'PNConnectedCategory',
  operation: 'PNSubscribeOperation',
  affectedChannels: [ 'hello_world' ],
  subscribedChannels: [ 'hello_world' ],
  affectedChannelGroups: [],
  lastTimetoken: 0,
  currentTimetoken: '16091521580071691'
}
published:  { timetoken: '16091521802154929' }

.........message......
received in:  first-node-uuid
{ title: 'this message is from: ', uuid: 'first-node-uuid' }
.....presence.......
action:  join
uuid:  first-node-uuid
channel:  hello_world

.........message......
received in:  first-node-uuid
{ title: 'this message is from: ', uuid: 'second-node-uuid' }
.....presence.......
action:  join
uuid:  second-node-uuid
channel:  hello_world
```

## Node 2

```
node node-2.js
....status.....

category:  {
  category: 'PNConnectedCategory',
  operation: 'PNSubscribeOperation',
  affectedChannels: [ 'hello_world' ],
  subscribedChannels: [ 'hello_world' ],
  affectedChannelGroups: [],
  lastTimetoken: 0,
  currentTimetoken: '16091521810618043'
}
published:  { timetoken: '16091521997015484' }

.........message......
received in:  second-node-uuid
{ title: 'this message is from: ', uuid: 'second-node-uuid' }
.....presence.......
action:  join
uuid:  second-node-uuid
channel:  hello_world
```
