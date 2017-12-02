import React, { Component } from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import Reducers from './Reducers'

const store = createStore(
  Reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        ...ownProps,
        Books: [
            {
                name: "Select Book",
                url: null,
            },
            {
                name: "Flight from the Dark",
                url: "https://www.projectaon.org/en/xhtml/lw/01fftd/",
            },
            {
                name: "Fire on the Water",
                url: "https://www.projectaon.org/en/xhtml/lw/02fotw/",
            },
            {
                name: "The Caverns of Kalte",
                url: "https://www.projectaon.org/en/xhtml/lw/03tcok/",
            },
            {
                name: "The Chasm of Doom",
                url: "https://www.projectaon.org/en/xhtml/lw/04tcod/",
            },
            {
                name: "Shadow on the Sand",
                url: "https://www.projectaon.org/en/xhtml/lw/05sots/",
            },
            {
                name: "The Kingdoms of Terror",
                url: "https://www.projectaon.org/en/xhtml/lw/06tkot/",
            },
            {
                name: "Castle Death",
                url: "https://www.projectaon.org/en/xhtml/lw/07cd/",
            },
            {
                name: "The Jungle of Horrors",
                url: "https://www.projectaon.org/en/xhtml/lw/08tjoh/",
            },
            {
                name: "The Cauldron of Fear",
                url: "https://www.projectaon.org/en/xhtml/lw/09tcof/",
            },
            {
                name: "The Dungeons of Torgar",
                url: "https://www.projectaon.org/en/xhtml/lw/10tdot/",
            },
            {
                name: "The Prisoners of Time",
                url: "https://www.projectaon.org/en/xhtml/lw/11tpot/",
            },
            {
                name: "The Masters of Darkness",
                url: "https://www.projectaon.org/en/xhtml/lw/12tmod/",
            },
        ],
        BookURLs: {
            toc: "toc.htm",
            map: "map.htm",
            section: {prepend: "sect", append: ".htm"}
        },
        KaiDisciplines: [
            {
                name: "",
            },
            {
                name: "Camouflage",
            },
            {
                name: "Hunting: no need for a Meal when instructed to eat",
            },
            {
                name: "Sixth Sense",
            },
            {
                name: "Tracking",
            },
            {
                name: "Healing: +1 ENDURANCE point for each section without combat",
            },
            {
                name: "Mindshield: no points lost when attacked by Mindblast",
            },
            {
                name: "Mindblast: +2 COMBAT SKILL points",
                CombatSkill: 2,
            },
            {
                name: "Animal Kinship",
            },
            {
                name: "Mind Over Matter",
            },
            {
                name: "Weaponskill in Dagger +2 COMBAT SKILL points if this weapon carried",
                weapon: "Dagger",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Spear +2 COMBAT SKILL points if this weapon carried",
                weapon: "Spear",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Mace +2 COMBAT SKILL points if this weapon carried",
                weapon: "Mace",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Short Sword +2 COMBAT SKILL points if this weapon carried",
                weapon: "Short Sword",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Warhammer +2 COMBAT SKILL points if this weapon carried",
                weapon: "Warhammer",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Sword +2 COMBAT SKILL points if this weapon carried",
                weapon: "Sword",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Axe +2 COMBAT SKILL points if this weapon carried",
                weapon: "Axe",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Quarterstaff +2 COMBAT SKILL points if this weapon carried",
                weapon: "Quarterstaff",
                CombatSkill: 2,
            },
            {
                name: "Weaponskill in Broadsword +2 COMBAT SKILL points if this weapon carried",
                weapon: "Broadsword",
                CombatSkill: 2,
            },
        ],
        generateRandomNumber() {
            let randomizer = [
                1,5,7,3,6,9,0,1,7,9,
                3,9,2,8,1,7,4,9,7,8,
                6,1,0,7,3,0,5,4,6,7,
                0,2,8,9,2,9,6,0,2,4,
                5,9,6,4,8,2,8,5,6,3,
                0,3,1,3,9,7,5,0,1,5,
                5,8,2,5,1,3,6,4,3,9,
                7,0,4,8,6,4,5,1,4,2,
                4,6,8,3,2,0,1,7,2,5,
                8,3,7,0,9,6,2,4,8,1,
            ]
            let random = Math.floor(Math.random() * randomizer.length)
            return randomizer[random]
        },
        fight(number, CombatRatio) {
            let results = {
                minus11: [
                    {enemy: 6, lonewolf: 0},
                    {enemy: 0, lonewolf: "dead"},
                    {enemy: 0, lonewolf: "dead"},
                    {enemy: 0, lonewolf: 8},
                    {enemy: 0, lonewolf: 8},
                    {enemy: 1, lonewolf: 7},
                    {enemy: 2, lonewolf: 6},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 4},
                    {enemy: 5, lonewolf: 3},
                ],
                minus10: [
                    {enemy: 7, lonewolf: 0},
                    {enemy: 0, lonewolf: "dead"},
                    {enemy: 0, lonewolf: 8},
                    {enemy: 0, lonewolf: 7},
                    {enemy: 1, lonewolf: 7},
                    {enemy: 2, lonewolf: 6},
                    {enemy: 3, lonewolf: 6},
                    {enemy: 4, lonewolf: 5},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                ],
                minus8: [
                    {enemy: 8, lonewolf: 0},
                    {enemy: 0, lonewolf: 8},
                    {enemy: 0, lonewolf: 7},
                    {enemy: 1, lonewolf: 6},
                    {enemy: 2, lonewolf: 6},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 5},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 2},
                ],
                minus6: [
                    {enemy: 9, lonewolf: 0},
                    {enemy: 0, lonewolf: 6},
                    {enemy: 1, lonewolf: 6},
                    {enemy: 2, lonewolf: 5},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 4},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 2},
                    {enemy: 8, lonewolf: 0},
                ],
                minus4: [
                    {enemy: 10, lonewolf: 0},
                    {enemy: 1, lonewolf: 6},
                    {enemy: 2, lonewolf: 5},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 4},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 2},
                    {enemy: 8, lonewolf: 1},
                    {enemy: 9, lonewolf: 0},
                ],
                minus2: [
                    {enemy: 11, lonewolf: 0},
                    {enemy: 2, lonewolf: 5},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 4},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 2},
                    {enemy: 8, lonewolf: 2},
                    {enemy: 9, lonewolf: 1},
                    {enemy: 10, lonewolf: 0},
                ],
                0: [
                    {enemy: 12, lonewolf: 0},
                    {enemy: 3, lonewolf: 5},
                    {enemy: 4, lonewolf: 4},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 2},
                    {enemy: 8, lonewolf: 2},
                    {enemy: 9, lonewolf: 1},
                    {enemy: 10, lonewolf: 0},
                    {enemy: 11, lonewolf: 0},
                ],
                2: [
                    {enemy: 14, lonewolf: 0},
                    {enemy: 4, lonewolf: 5},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 3},
                    {enemy: 8, lonewolf: 2},
                    {enemy: 9, lonewolf: 2},
                    {enemy: 10, lonewolf: 1},
                    {enemy: 11, lonewolf: 0},
                    {enemy: 12, lonewolf: 0},
                ],
                4: [
                    {enemy: 16, lonewolf: 0},
                    {enemy: 5, lonewolf: 4},
                    {enemy: 6, lonewolf: 3},
                    {enemy: 7, lonewolf: 3},
                    {enemy: 8, lonewolf: 2},
                    {enemy: 9, lonewolf: 2},
                    {enemy: 10, lonewolf: 2},
                    {enemy: 11, lonewolf: 1},
                    {enemy: 12, lonewolf: 0},
                    {enemy: 14, lonewolf: 0},
                ],
                6: [
                    {enemy: 18, lonewolf: 0},
                    {enemy: 6, lonewolf: 4},
                    {enemy: 7, lonewolf: 3},
                    {enemy: 8, lonewolf: 3},
                    {enemy: 9, lonewolf: 2},
                    {enemy: 10, lonewolf: 2},
                    {enemy: 11, lonewolf: 1},
                    {enemy: 12, lonewolf: 0},
                    {enemy: 14, lonewolf: 0},
                    {enemy: 16, lonewolf: 0},
                ],
                8: [
                    {enemy: "dead", lonewolf: 0},
                    {enemy: 7, lonewolf: 4},
                    {enemy: 8, lonewolf: 3},
                    {enemy: 9, lonewolf: 2},
                    {enemy: 10, lonewolf: 2},
                    {enemy: 11, lonewolf: 2},
                    {enemy: 12, lonewolf: 1},
                    {enemy: 14, lonewolf: 0},
                    {enemy: 16, lonewolf: 0},
                    {enemy: 18, lonewolf: 0},
                ],
                10: [
                    {enemy: "dead", lonewolf: 0},
                    {enemy: 8, lonewolf: 3},
                    {enemy: 9, lonewolf: 3},
                    {enemy: 10, lonewolf: 2},
                    {enemy: 11, lonewolf: 2},
                    {enemy: 12, lonewolf: 2},
                    {enemy: 14, lonewolf: 1},
                    {enemy: 16, lonewolf: 0},
                    {enemy: 18, lonewolf: 0},
                    {enemy: "dead", lonewolf: 0},
                ],
                11: [
                    {enemy: "dead", lonewolf: 0},
                    {enemy: 9, lonewolf: 3},
                    {enemy: 10, lonewolf: 2},
                    {enemy: 11, lonewolf: 2},
                    {enemy: 12, lonewolf: 2},
                    {enemy: 14, lonewolf: 1},
                    {enemy: 16, lonewolf: 1},
                    {enemy: 18, lonewolf: 0},
                    {enemy: "dead", lonewolf: 0},
                    {enemy: "dead", lonewolf: 0},
                ],

            }
            results.minus9 = results.minus10
            results.minus7 = results.minus8
            results.minus5 = results.minus6
            results.minus3 = results.minus4
            results.minus1 = results.minus2
            results[1] = results[2]
            results[3] = results[4]
            results[5] = results[6]
            results[7] = results[8]
            results[9] = results[10]

            return results[String(Math.max(-11,Math.min(CombatRatio,11))).replace("-","minus")][number]
        },
    }
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CharacterSheet/>
            </Provider>
        )
    }
}


class CharacterSheetView extends Component {
    render() {
        return (
            <View>
                <Header1>Character Sheet</Header1>
                <LinkToProject/>
                <GameMetaData/>
                <Book/>
                <Section/>
                <HR/>
                <Endurance/>
                <HR/>
                <Combat/>
                <HR/>
                <Weapons/>
                <HR/>
                <Kai/>
                <HR/>
                <BeltPouch/>
                <Meals/>
                <Backpack/>
                <SpecialItems/>
                <HR/>
                <SaveAndLoad/>
            </View>
        )
    }
}
const CharacterSheet = connect(mapStateToProps)(CharacterSheetView)

class LinkToProject extends Component {
    render() {
        return (
            <View>
                <Link href="https://www.projectaon.org/en/Main/Books" target="_blank">Project Aon</Link>
            </View>
        )
    }
}

class GameMetaDataView extends Component {
    render() {
        return (
            <View>
                <Label>Game Started</Label><Text>{this.props.CharacterSheet.GameStarted}</Text>
            </View>
        )
    }
}
const GameMetaData = connect(mapStateToProps)(GameMetaDataView)

class BookView extends Component {
    onChange = (input) => {
        let bookNumber = 0
        let Book = this.props.Books.filter((book, index) => {
            if (book.name === input.value) {
                bookNumber = index
                return true
            }
            return false
        })[0]

        Book = {...Book, number: bookNumber}

        this.props.dispatch({type: "UPDATE_BOOK", value: Book})
    }
    render() {
        return (
            <View>
                <Label>Book</Label>
                <Input name="Book" value={this.props.CharacterSheet.Book ? this.props.CharacterSheet.Book.name : null} select={this.props.Books} onChange={this.onChange}/>
                {this.props.CharacterSheet.Book ? <BookLinks/> : null}
            </View>
        )
    }
}
const Book = connect(mapStateToProps)(BookView)

class BookLinksView extends Component {
    render() {
        return (
            <View>
                <Link target="_blank" href={this.props.CharacterSheet.Book.url + this.props.BookURLs.toc}>Table of Contents</Link>
                {" "}|{" "}
                <Link target="_blank" href={this.props.CharacterSheet.Book.url + this.props.BookURLs.map}>Map</Link>
            </View>
        )
    }
}
const BookLinks = connect(mapStateToProps)(BookLinksView)

class SectionView extends Component {
    render() {
        return (
            <View>
                <Group name="Section" type="number"/>
                {this.props.CharacterSheet.Book && this.props.CharacterSheet.Section ? <Link target="_blank" href={this.props.CharacterSheet.Book.url + this.props.BookURLs.section.prepend + this.props.CharacterSheet.Section + this.props.BookURLs.section.append}>Go to Section</Link> : null}
            </View>
        )
    }
}
const Section = connect(mapStateToProps)(SectionView)

class EnduranceView extends Component {
    HealIncrement = () => {
        this.props.dispatch({type: "HEAL+1"})
    }
    render() {
        return (
            <View>
                <Group name="Max Endurance" type="number" />
                <Group name="Endurance" type="number" />
                <Button onClick={this.HealIncrement}>Heal +1</Button>
            </View>
        )
    }
}
const Endurance = connect(mapStateToProps)(EnduranceView)

class Combat extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <CombatSkill/>
                <View style={{cursor: "pointer", width: "100%", userSelect: "none"}} onClick={this.toggleDetails}>
                    <Link >({this.state.hideDetails ? "more" : "less"})</Link>
                </View>
                <View hidden={this.state.hideDetails}>
                    <EnemyCombatSkill/>
                    <EnemyEndurance/>
                </View>
                <CombatRatio hideCR={this.state.hideDetails}/>
            </View>
        )
    }
}

class CombatSkill extends Component {
    render() {
        return (
            <View>
                <Group name="Base Combat Skill" type="number"/>
                <Group name="Combat Skill" type="number"/>
            </View>
        )
    }
}

class EnemyCombatSkill extends Component {
    render() {
        return (
            <View>
                <Group name="Enemy Combat Skill"  type="number"/>
            </View>
        )
    }
}

class EnemyEndurance extends Component {
    render() {
        return (
            <View>
                <Group name="Enemy Endurance" type="number" />
            </View>
        )
    }
}

class CombatRatioView extends Component {

    state = {number: "-", damage: {}}

    fight = () => {
        let number = this.props.generateRandomNumber()
        
        this.setState({
            number: number,
            damage: this.props.fight(number, this.props.CharacterSheet.CombatRatio)
        })
    }

    updateEndurance = () => {
        this.props.dispatch({type: "UPDATE_ENDURANCE", value: this.state.damage})
    }

    clearEnemyStats = () => {
        this.props.dispatch({type: "CLEAR_ENEMY_STATS"})
    }

    generateRandomNumber = () => {
        this.setState({number: this.props.generateRandomNumber()})
    }

    render() {
        return (
            <View>
                <View hidden={this.props.hideCR}>
                    <Label>Combat Ratio</Label>
                    <TextWithInputFont>
                    {
                        this.props.CharacterSheet.CombatRatio === undefined
                        || isNaN(this.props.CharacterSheet.CombatRatio)
                        || this.props.CharacterSheet.CombatSkill === ""
                        || this.props.CharacterSheet.EnemyCombatSkill === ""
                            ? "-"
                            : this.props.CharacterSheet.CombatRatio
                    }</TextWithInputFont>
                    <Label>Combat Results</Label>
                    <TextWithInputFont>
                        Enemy:{" "}
                        {this.state.damage.enemy !== undefined
                            ? isNaN(this.state.damage.enemy*-1)
                                ? this.state.damage.enemy
                                : this.state.damage.enemy*-1
                            : "-"
                        }
                        {" "}/{" "}
                        Lone Wolf:{" "}
                        {this.state.damage.lonewolf !== undefined
                            ? isNaN(this.state.damage.lonewolf*-1)
                                ? this.state.damage.lonewolf
                                : this.state.damage.lonewolf*-1
                            : "-"
                        }
                    </TextWithInputFont>
                    <Button onClick={this.fight}>Fight</Button>
                    <Button onClick={this.updateEndurance}>Update Endurance</Button>
                    <Button onClick={this.clearEnemyStats}>Clear Enemy Stats</Button>
                </View>
                <Label>Random Number</Label>
                <TextWithInputFont>{this.state.number}</TextWithInputFont>
                <Button onClick={this.generateRandomNumber}>Generate Number</Button>
            </View>
        )
    }
}
const CombatRatio = connect(mapStateToProps)(CombatRatioView)

class KaiView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label>Kai Disciplines</Label>
                <View hidden={this.state.hideDetails}>
                    <View>
                        <Input name="Kai1" select={this.props.KaiDisciplines}/>
                    </View>
                    <View>
                        <Input name="Kai2" select={this.props.KaiDisciplines}/>
                    </View>
                    <View>
                        <Input name="Kai3" select={this.props.KaiDisciplines}/>
                    </View>
                    <View>
                        <Input name="Kai4" select={this.props.KaiDisciplines}/>
                    </View>
                    <View>
                        <Input name="Kai5" select={this.props.KaiDisciplines}/>
                    </View>
                    <View>
                        <Input name="Kai6" select={this.props.KaiDisciplines} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 2}/>
                    </View>
                    <View>
                        <Input name="Kai7" select={this.props.KaiDisciplines} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 3}/>
                    </View>
                    <View>
                        <Input name="Kai8" select={this.props.KaiDisciplines} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 4}/>
                    </View>
                    <View>
                        <Input name="Kai9" select={this.props.KaiDisciplines} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 5}/>
                    </View>
                    <View>
                        <Input name="Kai10" select={this.props.KaiDisciplines} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 6}/>
                    </View>
                </View>
                <View style={{cursor: "pointer", width: "100%", userSelect: "none"}} onClick={this.toggleDetails}>
                    <Link >({this.state.hideDetails ? "show" : "hide"})</Link>
                </View>
            </View>
        )
    }
}
const Kai = connect(mapStateToProps)(KaiView)

class WeaponsView extends Component {
    render() {
        return (
            <View>
                <Label>Weapons</Label>
                <View>
                    <Input name="Weapon1" />
                </View>
                <View>
                    <Input name="Weapon2" />
                </View>
            </View>
        )
    }
}
const Weapons = connect(mapStateToProps)(WeaponsView)

class BeltPouchView extends Component {
    render() {
        return (
            <View>
                <Group name="Belt Pouch" append="50 gold crowns max" type="number"/>
            </View>
        )
    }
}
const BeltPouch = connect(mapStateToProps)(BeltPouchView)

class MealsView extends Component {
    render() {
        return (
            <View hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number !== 1}>
                <Group name="Meals" type="number" />
            </View>
        )
    }
}
const Meals = connect(mapStateToProps)(MealsView)

class BackpackView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label>Backpack Items</Label>
                <View hidden={this.state.hideDetails}>
                    <View>
                        <Input name="BackpackItem1" />
                    </View>
                    <View>
                        <Input name="BackpackItem2" />
                    </View>
                    <View>
                        <Input name="BackpackItem3" />
                    </View>
                    <View>
                        <Input name="BackpackItem4" />
                    </View>
                    <View>
                        <Input name="BackpackItem5" />
                    </View>
                    <View>
                        <Input name="BackpackItem6" />
                    </View>
                    <View>
                        <Input name="BackpackItem7" />
                    </View>
                    <View>
                        <Input name="BackpackItem8" />
                    </View>
                </View>
                <View style={{cursor: "pointer", width: "100%", userSelect: "none"}} onClick={this.toggleDetails}>
                    <Link >({this.state.hideDetails ? "show" : "hide"})</Link>
                </View>
            </View>
        )
    }
}
const Backpack = connect(mapStateToProps)(BackpackView)

class SpecialItemsView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label>Special Items</Label>
                <View hidden={this.state.hideDetails}>
                    <View>
                        <Input name="SpecialItem1" />
                    </View>
                    <View>
                        <Input name="SpecialItem2" />
                    </View>
                    <View>
                        <Input name="SpecialItem3" />
                    </View>
                    <View>
                        <Input name="SpecialItem4" />
                    </View>
                    <View>
                        <Input name="SpecialItem5" />
                    </View>
                    <View>
                        <Input name="SpecialItem6" />
                    </View>
                    <View>
                        <Input name="SpecialItem7" />
                    </View>
                    <View>
                        <Input name="SpecialItem8" />
                    </View>
                </View>
                <View style={{cursor: "pointer", width: "100%", userSelect: "none"}} onClick={this.toggleDetails}>
                    <Link >({this.state.hideDetails ? "show" : "hide"})</Link>
                </View>
            </View>
        )
    }
}
const SpecialItems = connect(mapStateToProps)(SpecialItemsView)

class SaveAndLoadView extends Component {

    state = {gameId: null, hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    loadGame = () => {
        this.props.dispatch({type: "LOAD_GAME", value: this.props.CharacterSheet.GameState})
    }
    modifyGameState = (input) => {
        this.props.dispatch({type: "MODIFY_GAME_STATE", value: input.value})
    }
    clear = () => {
        this.props.dispatch({type: "CLEAR_GAME_STATE"})
    }
    modifyRemoteGameId = (input) => {
        this.setState({gameId: input.value})
    }
    loadGameRemotely = () => {
        console.log("coming soon")
    }
    saveGameRemotely = () => {
        console.log("coming soon")
    }
    render() {
        return (
            <View>
                <Label>Game State</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="GameState" onChange={this.modifyGameState} box/>
                    <Button onClick={this.loadGame}>Load  Local Game</Button>
                    <Button onClick={this.clear}>Clear</Button>
                    <Label>Remote Game ID</Label>
                    <Input value={this.state.gameId} onChange={this.modifyRemoteGameId}/>
                    <Button onClick={this.loadGameRemotely}>Load Game Remotely</Button>
                    <Button onClick={this.saveGameRemotely}>Save Game Remotely</Button>
                </View>
                <View style={{cursor: "pointer", width: "100%", userSelect: "none"}} onClick={this.toggleDetails}>
                    <Link >({this.state.hideDetails ? "show" : "hide"})</Link>
                </View>
            </View>
        )
    }
}
const SaveAndLoad = connect(mapStateToProps)(SaveAndLoadView)

class Group extends Component {
    render() {
        return (
            <View hidden={this.props.hidden}>
                <Label>{this.props.name}{this.props.append ? <Text> ({this.props.append})</Text> : null}</Label>
                <Input
                    name={this.props.name.replace(/ /g,"")}
                    type={this.props.type}
                    select={this.props.select}
                    box={this.props.box}
                />
            </View>
        )
    }
}

class InputView extends Component {

    onChange = (input) => {
        if (this.props.onChange) {
            return this.props.onChange(input.target)
        }
        this.props.dispatch({type: this.props.name, value: input.target.value})
    }
    render() {
        if (this.props.hidden) return null
        if (this.props.select) {
            return (
                <View style={{marginBottom: "2px"}}>
                    <select
                        id={this.props.name}
                        style={{width: "100%", padding: "2px"}}
                        value={this.props.value || this.props.CharacterSheet[this.props.name] || ""}
                        onChange={this.onChange}
                    >
                        {this.props.select.map(option => {return <option key={option.name}>{option.name}</option>})}
                    </select>
                </View>
            )
        }
        if (this.props.box) {
            return (
                <View style={{marginBottom: "2px"}}>
                    <textarea
                        id={this.props.name}
                        style={{width: "98%", height: "200px", padding: "2px"}}
                        value={this.props.value || this.props.CharacterSheet[this.props.name] || ""}
                        onChange={this.onChange}
                    />
                </View>
            )
        }
        return (
            <View style={{marginBottom: "2px"}}>
                <input
                    id={this.props.name}
                    style={{width: "98%", padding: "2px"}}
                    value={this.props.value || this.props.CharacterSheet[this.props.name] || ""}
                    type={this.props.type}
                    onChange={this.onChange}
                />
            </View>
        )
    }
}
const Input = connect(mapStateToProps)(InputView)

class Label extends Component {
    render() {
        return (
            <View style={{marginTop: "10px"}}>
                <label style={{fontWeight: "bold"}}>{this.props.children}:</label>
            </View>
        )
    }
}

class Button extends Component {
    onClick = (input) => {
        if (!this.props.onClick) return false
        this.props.onClick(input.target)
    }
    render() {
        return (
            <View style={{marginTop: "10px"}}>
                <button onClick={this.onClick}>{this.props.children}</button>
            </View>
        )
    }
}

class Header1 extends Component {
    render() {
        return (
            <h1>{this.props.children}</h1>
        )
    }
}

class View extends Component {
    render() {
        return (
            <div {...this.props}/>
        )
    }
}

class Text extends Component {
    render() {
        return (
            <span {...this.props}/>
        )
    }
}

class TextWithInputFont extends Component {
    render() {
        return (
            <Text className="input-font" {...this.props}/>
        )
    }
}

class Link extends Component {
    render() {
        return (
            <a href={this.props.href} target={this.props.target} onClick={this.props.onClick} style={{color: "-webkit-link"}}>{this.props.children}</a>
        )
    }
}

class HR extends Component {
    render() {
        return (
            <hr/>
        )
    }
}