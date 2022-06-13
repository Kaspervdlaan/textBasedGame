const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('button')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up hungry in a strange room, you see a bacon sandwich next to you.',
        options: [
            {
                text: 'Leave the sandwich',
                nextText: 2,
            },
            {
                text: 'Eat the sandwich',
                nextText: 2,
            },
            {
                text: 'Put the sandwich in backpack',
                setState: { sandwich: true },
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text: 'You find the room you are in to be locked. You start panicking a bit..',
        options: [
            {
                text: 'Bang the door',
                nextText: 4,
            },
            {
                text: 'Scream for help',
                nextText: 4,
            },
            {
                text: 'Look for a way out',
                nextText: 3,
            },
        ]
    },
    {
        id: 3,
        text: 'While looking out the window for a way out, you get hit from behind and fall to your death..',
        options: [
            {
                text: 'Restart Game',
                nextText: -1
            }
        ]
    },
    {
        id: 4,
        text: 'A man comes to the door telling us to shut up.',
        options: [
            {
                text: 'Offer to trade the sandwich for a way out.',
                requiredState: (currentState) => currentState.sandwich,
                setState: { sandwich: false, key: true },
                nextText: 5,
            },
            {
                text: 'Beg for a way out',
                nextText: 6,
            },
        ]
    },
    {
        id: 5,
        text: 'The man agrees and gives you a key.',
        options: [
            {
                text: 'Use the key on door',
                requiredState: (currentState) => currentState.key,
                setState: { key: false },
                nextText: 7,
            },
            {
                text: 'Wait until night to open door',
                requiredState: (currentState) => currentState.key,
                setState: { key: false },
                nextText: 8,
            }
        ]
    },
    {
        id: 6,
        text: 'The man declines and you fall asleep shivering, you die from the cold in the dark dark night..',
        options: [
            {
                text: 'Restart Game',
                nextText: -1,
            }
        ]
    },
    {
        id: 7,
        text: 'You successfully made it out of the locked room!',
        options: [
            {
                text: 'Restart Game',
                nextText: -1,
            }
        ]
    },
    {
        id: 8,
        text: 'You open the door to be shot by the night shift guard!',
        options: [
            {
                text: 'Restart Game',
                nextText: -1,
            }
        ]
    }
]


startGame()