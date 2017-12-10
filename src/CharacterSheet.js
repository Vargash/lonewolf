import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

// Redux
import {store} from './Store'
import {mapStateToProps} from './mapStateToProps'

// Web Components (React)
import {
    View, // mimicks React Native built-in component
    Header1,
    Text, // mimicks React Native built-in component
    Link,
    TextWithInputFont,
    Label,
    LabelInline,
    TextInput, // mimicks React Native built-in component
    Picker, // mimicks React Native built-in component
    PickerItemGroup,
    PickerItem, // mimicks React Native built-in component (Picker.Item)
    Switch, // mimicks React Native built-in component
    Button, // mimicks React Native built-in component
    HR
} from './WebComponents'

// Native Components (React Native)
/*
import {
    View,
    Text,
    TextInput,
    Picker,
    Switch,
    Button,
} from 'react-native'

import {
    Header1,
    Link,
    TextWithInputFont,
    Label,
    LabelInline,
    PickerItemGroup,
    PickerItem,
    HR,
} from './NativeComponents'
*/

let APItimeout = null

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

    componentDidMount() {
        console.log("Set debugApp to true to see game state data.")

        this.props.dispatch({type: "INIT"})
        this.props.dispatch({type: "INIT_REQUEST_FEEDBACK"})

    }

    render() {
        return (
            <View>
                <Header1>Character Sheet</Header1>
                <LinkToProject/>
                <HR/>
                <GameMetaData/>
                <HR/>
                <Book/>
                <HR/>
                <Combat>
                    <Endurance/>
                    <HR/>
                </Combat>
                <HR/>
                <Weapons/>
                <HR/>
                <Kai/>
                <Magnakai/>
                <LoreCircles/>
                <HR/>
                {/*<Weaponmastery/>*/}
                <BeltPouch/>
                <Meals/>
                <HR/>
                <Backpack/>
                <HR/>
                <SpecialItems/>
                <HR/>
                <Notes/>
                <HR/>
                <GameState/>
                <HR/>
                <SaveAndLoadRemotely/>
                <Spacer/>
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

    state = {hideDetails: false}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Game ID</Label>
                <View hidden={this.state.hideDetails}>
                    <Text>{this.props.RequestFeedback.actualGameID !== undefined ? String(this.props.RequestFeedback.actualGameID) : "-"}</Text>
                    <Label>Game Started</Label>
                    <Text>{this.props.CharacterSheet.GameStarted}</Text>
                    <Label>Game Last Saved</Label>
                    <Text>{this.props.CharacterSheet.GameSaved || "-"}</Text>
                </View>
            </View>
        )
    }
}
const GameMetaData = connect(mapStateToProps)(GameMetaDataView)

class BookView extends Component {

    state = {hideDetails: false}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    onChange = (input) => {
        let bookNumber = 0
        let Book = this.props.Books.filter((book, index) => {

            if (String(index) + " - " + book.name === input.value) {
                bookNumber = index
                return true
            }
            return false
        })[0]

        Book = {...Book, number: bookNumber}

        this.props.dispatch({type: "UPDATE_BOOK", value: Book, API: this.props.API, save: true})
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Book</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="Book" value={this.props.CharacterSheet.Book ? this.props.CharacterSheet.Book.number + " - " + this.props.CharacterSheet.Book.name : null} select={this.props.Books} optGroups={this.props.BookGroups} showIndex onChange={this.onChange}/>
                    {this.props.CharacterSheet.Book ? <BookLinks/> : null}
                    <Section/>
                </View>
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
                <Group name="Section" type="number" numbers noPlusAndMinus/>
                {this.props.CharacterSheet.Book && this.props.CharacterSheet.Section ? <Link target="_blank" href={this.props.CharacterSheet.Book.url + this.props.BookURLs.section.prepend + this.props.CharacterSheet.Section + this.props.BookURLs.section.append}>Go to Section</Link> : null}
            </View>
        )
    }
}
const Section = connect(mapStateToProps)(SectionView)

class EnduranceView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    getBonuses = (returnRawData) => {

        let bonuses = []
        let bonusValues = []
        let {CharacterSheet} = {...this.props}

        // bonuses from special items
        for (let i = 1; i <= 16; i++) {
            let item = CharacterSheet["SpecialItem" + i]
            if (item !== undefined && item.length > 0) {
                let bonusTextIndex = item.toLowerCase().indexOf("endurance")
                if (bonusTextIndex > -1) {
                    let bonusValueIndex = item.substring(Math.min(bonusTextIndex-5, bonusTextIndex),item.length).indexOf("+")
                    if (bonusValueIndex > -1) {
                        let bonusValueAbsoluteIndex = bonusTextIndex-Math.min(5, bonusTextIndex)+bonusValueIndex
                        let bonusValue = item.substring(bonusValueAbsoluteIndex,bonusValueAbsoluteIndex+3)
                        bonuses.push(<Text key={Math.random()}>+{Number(Math.floor(bonusValue))}&nbsp;(special&nbsp;item) </Text>)
                        bonusValues.push(Number(Math.floor(bonusValue)))
                    }
                }
            }
        }
        
        if (returnRawData === true) {
            return bonusValues
        }

        return bonuses.map(bonus => {return bonus})
    }

    addBonus = () => {
        
         let bonuses = this.getBonuses(true)
 
         this.props.dispatch({type: "MaxEndurance", value: (this.props.CharacterSheet.MaxEndurance || 0) + (bonuses.length > 0 ? bonuses.reduce((sum, value) => {return sum+value}) : 0), API: this.props.API, save: true})
 
     }

     toMax = () => {

        this.props.dispatch({type: "Endurance", value: this.props.CharacterSheet.MaxEndurance || 0, API: this.props.API, save: true})

        if (this.props.CharacterSheet.MaxEndurance === "" || this.props.CharacterSheet.MaxEndurance === undefined) {
            this.props.dispatch({type: "MaxEndurance", value: 0})
        }
        
     }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Max Endurance</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="MaxEndurance" type="number" />
                    <Text>{this.getBonuses()}</Text>
                    <Group name="Endurance" type="number" negativeNumbers/>
                    <Button onClick={this.toMax} style={{marginRight: "5px"}} inline>Heal to Max</Button>
                </View>
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
                <HR/>
                {/* endurance */}
                {this.props.children}
                <Label onClick={this.toggleDetails}>Enemy Combat Skill</Label>
                <View hidden={this.state.hideDetails}>
                    <EnemyCombatSkill/>
                    <EnemyEndurance/>
                    <EnemyImmunity/>
                    <CombatRatio/>
                </View>
            </View>
        )
    }
}

class CombatSkillView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    getBonuses = (returnRawData) => {

        let bonuses = []
        let bonusValues = []
        let {CharacterSheet, KaiDisciplines} = {...this.props}

        if (this.props.CharacterSheet.Book && this.props.CharacterSheet.Book.number < 6) {
            // bonuses from kai disciplines
            for (let i = 1; i <= 10; i++) {
                let kaiDiscipline = CharacterSheet["Kai" + i]
                if (kaiDiscipline !== undefined) {
                    if (kaiDiscipline.toLowerCase().indexOf("mindblast") > -1 && kaiDiscipline.toLowerCase().indexOf("mindshield") === -1 && !this.props.CharacterSheet.ImmunetoMindblast) {
                        bonuses.push(<Text key={Math.random()}>+2&nbsp;(mindblast) </Text>)
                        bonusValues.push(2)
                    }
                    else if (kaiDiscipline.toLowerCase().indexOf("weaponskill") > -1) {
                        for (let x = 1; x <= 2; x++) {
                            let weapon = CharacterSheet["Weapon" + x]
                            let weaponSkill = KaiDisciplines.filter(function(kai) {
                                // special case: do not consider a "short sword" as a regular sword
                                if (weapon && (weapon.toLowerCase().indexOf("short sword") > -1) && kai.weapon && kai.weapon.toLowerCase() === "sword") {
                                    return false
                                }
                                return kai.name === kaiDiscipline && kai.weapon && weapon && weapon.toLowerCase().indexOf(kai.weapon.toLowerCase()) > -1 
                            })
                            if (weaponSkill.length > 0) {
                                bonuses.push(<Text key={Math.random()}>+2&nbsp;(weaponskill:&nbsp;{weapon}) </Text>)
                                bonusValues.push(2)
                                break
                            }
                        }
                    }
                }
            }
        }
        else {
            // bonuses from kai disciplines
            for (let i = 1; i <= 10; i++) {
                let kaiDiscipline = CharacterSheet["Magnakai" + i]
                if (kaiDiscipline !== undefined) {
                    if (kaiDiscipline.toLowerCase().indexOf("mindblast") > -1) {
                        if (this.props.CharacterSheet.UsePsiSurge) {
                            bonuses.push(<Text key={Math.random()}>+4&nbsp;(psi-surge) </Text>)
                            bonusValues.push(4)
                        }
                        else if (!this.props.CharacterSheet.ImmunetoMindblast) {
                            bonuses.push(<Text key={Math.random()}>+2&nbsp;(mindblast) </Text>)
                            bonusValues.push(2)
                        }
                    }
                    else if (kaiDiscipline.toLowerCase().indexOf("weaponmastery") > -1) {
                        for (let x = 1; x <= 2; x++) {
                            let weapon = CharacterSheet["Weapon" + x]
                            let weaponSkill = KaiDisciplines.filter(function(kai) {
                                // TODO: Check if the weapon has been mastered by scrutinizing the Weaponmastery Checklist.
                                // special case: do not consider a "short sword" as a regular sword
                                /*
                                if (weapon && (weapon.toLowerCase().indexOf("short sword") > -1) && kai.weapon && kai.weapon.toLowerCase() === "sword") {
                                    return false
                                }
                                return kai.name === kaiDiscipline && kai.weapon && weapon && weapon.toLowerCase().indexOf(kai.weapon.toLowerCase()) > -1 
                                */
                            })
                            if (weaponSkill.length > 0) {
                                bonuses.push(<Text key={Math.random()}>+3&nbsp;(weaponmastery:&nbsp;{weapon}) </Text>)
                                bonusValues.push(3)
                                break
                            }
                        }
                    }
                }
            }       
        }

        // bonuses from special items
        for (let i = 1; i <= 16; i++) {
            let item = CharacterSheet["SpecialItem" + i]
            if (item !== undefined && item.length > 0) {
                let bonusTextIndex = item.toLowerCase().indexOf("combat skill")
                if (bonusTextIndex > -1) {
                    let bonusValueIndex = item.substring(Math.min(bonusTextIndex-5, bonusTextIndex),item.length).indexOf("+")
                    if (bonusValueIndex > -1) {
                        let bonusValueAbsoluteIndex = bonusTextIndex-Math.min(5, bonusTextIndex)+bonusValueIndex
                        let bonusValue = item.substring(bonusValueAbsoluteIndex,bonusValueAbsoluteIndex+3)
                        bonuses.push(<Text key={Math.random()}>+{Number(Math.floor(bonusValue))}&nbsp;(special&nbsp;item) </Text>)
                        bonusValues.push(Number(Math.floor(bonusValue)))
                    }
                }
            }
        }

        if (returnRawData === true) {
            return bonusValues
        }

        return bonuses.map(bonus => {return bonus})
    }

    addBonus = () => {
       
        let bonuses = this.getBonuses(true)

        this.props.dispatch({type: "CombatSkill", value: (this.props.CharacterSheet.BaseCombatSkill || 0) + (bonuses.length > 0 ? bonuses.reduce((sum, value) => {return sum+value}) : 0), API: this.props.API, save: true})

    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Base Combat Skill</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="BaseCombatSkill" type="number"/>
                    <Button onClick={this.addBonus} style={{marginRight: "5px"}} inline>Update Combat Skill</Button>
                    <Text>{this.getBonuses()}</Text>
                    <Group name="Combat Skill" type="number"/>
                </View>
            </View>
        )
    }
}
const CombatSkill = connect(mapStateToProps)(CombatSkillView)

class EnemyCombatSkill extends Component {
    render() {
        return (
            <View>
                <Input name="EnemyCombatSkill"  type="number"/>
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
class EnemyImmunityView extends Component {

    hasMindBlast = () => {

        let {CharacterSheet} = {...this.props}

        let hasMindBlast = false

        if (this.props.CharacterSheet.Book && this.props.CharacterSheet.Book.number < 6) {

            for (let i = 1; i <= 10; i++) {
                let kaiDiscipline = CharacterSheet["Kai" + i]
                if (kaiDiscipline !== undefined) {
                    if (kaiDiscipline.toLowerCase().indexOf("mindblast") > -1 && kaiDiscipline.toLowerCase().indexOf("mindshield") === -1) {
                        hasMindBlast = true
                    }
                }
            }

        }
        else {

            for (let i = 1; i <= 10; i++) {
                let kaiDiscipline = CharacterSheet["Magnakai" + i]
                if (kaiDiscipline !== undefined) {
                    if (kaiDiscipline.toLowerCase().indexOf("mindblast") > -1 && kaiDiscipline.toLowerCase().indexOf("mindshield") === -1) {
                        hasMindBlast = true
                    }
                }
            }

        }

        return hasMindBlast
    }

    render() {
        return (
            <View hidden={!this.hasMindBlast()}>
                <Group name="Immune to Mindblast" type="checkbox" />
            </View>
        )
    }
}
const EnemyImmunity = connect(mapStateToProps)(EnemyImmunityView)

class CombatRatioView extends Component {

    state = {number: "-", damage: {}, round: 0}

    fight = () => {
        
        let number = this.props.generateRandomNumber()
        
        let state = {
            number: number,
            damage: this.props.fight(number, this.props.CharacterSheet.CombatRatio),
            round: this.state.round + 1,
        }

        this.setState(state)

        return state
    }

    updateEndurance = (input, damage = null) => {

        if (damage == null && this.state.damage.enemy === undefined && this.state.damage.lonewolf === undefined) return null

        debugger

        if (this.props.CharacterSheet.UsePsiSurge) {
            damage = {...(damage || this.state.damage)}
            damage.lonewolf = damage.lonewolf + 2
        }

        this.props.dispatch({type: "UPDATE_ENDURANCE", value: (damage || this.state.damage), API: this.props.API, save: true})
    }

    fightAndUpdateEndurance = () => {
        let damage = this.fight().damage
        
        this.updateEndurance(null, damage)
    }

    clearEnemyStats = () => {
        this.props.dispatch({type: "CLEAR_ENEMY_STATS", API: this.props.API, save: true})
        this.setState({damage: {}, round: 0})
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
                        {" "}
                        <Text hidden={!this.props.CharacterSheet.UsePsiSurge}>
                            (-2 psi-surge)
                        </Text>
                    </TextWithInputFont>
                    <Label>Round</Label>
                    <TextWithInputFont>
                        {this.state.round}
                    </TextWithInputFont>
                    <UsePsiSurge/>
                    <Button onClick={this.fight} disabled={
                        this.props.CharacterSheet.CombatSkill === undefined
                        || this.props.CharacterSheet.CombatSkill === ""
                        || this.props.CharacterSheet.EnemyCombatSkill === undefined
                        || this.props.CharacterSheet.EnemyCombatSkill === ""
                    }>Fight</Button>
                    <Button onClick={this.updateEndurance} disabled={
                        this.props.CharacterSheet.CombatSkill === undefined
                        || this.props.CharacterSheet.CombatSkill === ""
                        || this.props.CharacterSheet.EnemyCombatSkill === undefined
                        || this.props.CharacterSheet.EnemyCombatSkill === ""
                        || this.props.CharacterSheet.Endurance === undefined
                        || this.props.CharacterSheet.Endurance === ""
                        || this.props.CharacterSheet.EnemyEndurance === undefined
                        || this.props.CharacterSheet.EnemyEndurance === ""
                    }>Update Endurance</Button>
                    <Button onClick={this.fightAndUpdateEndurance} disabled={
                        this.props.CharacterSheet.CombatSkill === undefined
                        || this.props.CharacterSheet.CombatSkill === ""
                        || this.props.CharacterSheet.EnemyCombatSkill === undefined
                        || this.props.CharacterSheet.EnemyCombatSkill === ""
                        || this.props.CharacterSheet.Endurance === undefined
                        || this.props.CharacterSheet.Endurance === ""
                        || this.props.CharacterSheet.EnemyEndurance === undefined
                        || this.props.CharacterSheet.EnemyEndurance === ""
                    }>Fight & Update Endurance</Button>
                    <Button onClick={this.clearEnemyStats}>Clear Enemy Stats</Button>
                </View>
                <HR/>
                <Label>Random Number</Label>
                <TextWithInputFont>{this.state.number}</TextWithInputFont>
                <Button onClick={this.generateRandomNumber}>Generate Number</Button>
            </View>
        )
    }
}
const CombatRatio = connect(mapStateToProps)(CombatRatioView)

class UsePsiSurgeView extends Component {

    hasPsiSurge = () => {

        let {CharacterSheet} = {...this.props}

        let hasPsiSurge = false

        if (this.props.CharacterSheet.Book && this.props.CharacterSheet.Book.number >= 6) {

            for (let i = 1; i <= 10; i++) {
                let kaiDiscipline = CharacterSheet["Magnakai" + i]
                if (kaiDiscipline !== undefined) {
                    if (kaiDiscipline.toLowerCase().indexOf("psi-surge") > -1) {
                        hasPsiSurge = true
                    }
                }
            }

        }

        return hasPsiSurge

    }

    render() {
        return (
            <View hidden={!this.hasPsiSurge()}>
                <Input name="UsePsiSurge" type="checkbox" inline />
                <LabelInline htmlFor="UsePsiSurge">Use Psi-surge</LabelInline>
            </View>
        )
    }
}
const UsePsiSurge = connect(mapStateToProps)(UsePsiSurgeView)

class KaiView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {

        if (this.props.CharacterSheet.Book && this.props.CharacterSheet.Book.number >= 6) {
            return null
        }

        return (
            <View>
                <Label onClick={this.toggleDetails}>Kai Disciplines</Label>
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
                    <Group name="Kai Level" select={this.props.KaiLevels}/>
                </View>
                <HR/>
            </View>
        )
    }
}
const Kai = connect(mapStateToProps)(KaiView)

class MagnakaiView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {

        if (this.props.CharacterSheet.Book && this.props.CharacterSheet.Book.number < 6) {
            return null
        }

        return (
            <View>
                <Label onClick={this.toggleDetails}>Magnakai Disciplines</Label>
                <View hidden={this.state.hideDetails}>
                    <View>
                        <Input name="Magnakai1" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles}/>
                    </View>
                    <View>
                        <Input name="Magnakai2" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles}/>
                    </View>
                    <View>
                        <Input name="Magnakai3" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles}/>
                    </View>
                    <View>
                        <Input name="Magnakai4" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 7}/>
                    </View>
                    <View>
                        <Input name="Magnakai5" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 8}/>
                    </View>
                    <View>
                        <Input name="Magnakai6" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 9}/>
                    </View>
                    <View>
                        <Input name="Magnakai7" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 10}/>
                    </View>
                    <View>
                        <Input name="Magnakai8" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 11}/>
                    </View>
                    <View>
                        <Input name="Magnakai9" select={this.props.v} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 12}/>
                    </View>
                    <View>
                        <Input name="Magnakai10" select={this.props.MagnakaiDisciplines} optGroups={this.props.LoreCircles} hidden={!this.props.CharacterSheet.Book || this.props.CharacterSheet.Book.number < 13}/>
                    </View>
                    <Group name="Magnakai Level" select={this.props.MagnakaiLevels}/>
                </View>
                <HR/>
            </View>
        )
    }
}
const Magnakai = connect(mapStateToProps)(MagnakaiView)

class LoreCirclesView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    checkLoreCircle = (LoreCircle) => {
        return true
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Lore Circles</Label>
                <View hidden={this.state.hideDetails}>
                    <View>
                        <TextWithInputFont hidden={!this.checkLoreCircle("CircleOfFire")}>Circle of Fire: +1 COMBAT +2 ENDURANCE</TextWithInputFont>
                    </View>
                    <View>
                        <TextWithInputFont hidden={!this.checkLoreCircle("CircleOfLight")}>Circle of Light: +3 ENDURANCE</TextWithInputFont>
                    </View>
                    <View>
                        <TextWithInputFont hidden={!this.checkLoreCircle("CircleOfSolaris")}>Circle of Solaris: +1 COMBAT +3 ENDURANCE</TextWithInputFont>
                    </View>
                    <View>
                        <TextWithInputFont hidden={!this.checkLoreCircle("CircleOfTheSpirit")}>Circle of the Spirit: +3 COMBAT +3 ENDURANCE</TextWithInputFont>
                    </View>
                </View>
            </View>
        )
    }
}
const LoreCircles = connect(mapStateToProps)(LoreCirclesView)

class WeaponsView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Weapons</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="Weapon1" />
                    <Input name="Weapon2" />
                </View>
            </View>
        )
    }
}
const Weapons = connect(mapStateToProps)(WeaponsView)

class BeltPouchView extends Component {
    
    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Belt Pouch</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="BeltPouch" append="50 gold crowns max" type="number"/>
                </View>
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
                <Label onClick={this.toggleDetails}>Backpack Items</Label>
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
                <Label onClick={this.toggleDetails}>Special Items</Label>
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
                    <View>
                        <Input name="SpecialItem9" />
                    </View>
                    <View>
                        <Input name="SpecialItem10" />
                    </View>
                    <View>
                        <Input name="SpecialItem11" />
                    </View>
                    <View>
                        <Input name="SpecialItem12" />
                    </View>
                    <View>
                        <Input name="SpecialItem13" />
                    </View>
                    <View>
                        <Input name="SpecialItem14" />
                    </View>
                    <View>
                        <Input name="SpecialItem15" />
                    </View>
                    <View>
                        <Input name="SpecialItem16" />
                    </View>
                </View>
            </View>
        )
    }
}
const SpecialItems = connect(mapStateToProps)(SpecialItemsView)

class NotesView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Notes</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="Notes" box/>
                </View>
            </View>
        )
    }
}
const Notes = connect(mapStateToProps)(NotesView)

class GameStateView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }

    loadGame = () => {
        this.props.dispatch({type: "LOAD_GAME", value: this.props.CharacterSheet.GameState, API: this.props.API})

        if (this.props.CharacterSheet.GameState === "") {
            this.props.dispatch({type: "UPDATE_ACTUAL_GAME_ID_REQUEST_FEEDBACK"})
        }
    }
    modifyGameState = (input) => {
        this.props.dispatch({type: "MODIFY_GAME_STATE", value: input.value, API: this.props.API})
    }
    clear = () => {
        this.props.dispatch({type: "CLEAR_GAME_STATE", API: this.props.API})
    }
    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Game State</Label>
                <View hidden={this.state.hideDetails}>
                    <Input name="GameState" value={this.props.CharacterSheet.GameState} onChange={this.modifyGameState} box/>
                    <Button onClick={this.loadGame}>{this.props.CharacterSheet.GameState === "" ? <Text>Start New Game</Text> : <Text>Load Custom Game State</Text>}</Button>
                    <Button onClick={this.clear}>Clear Custom Game State</Button>
                </View>
            </View>
        )
    }
}
const GameState = connect(mapStateToProps)(GameStateView)

class SaveAndLoadRemotelyView extends Component {

    state = {hideDetails: true}

    toggleDetails = () => {
        this.setState({hideDetails: !this.state.hideDetails})
    }
    modifyGameID = (input) => {
        this.props.dispatch({type: "UPDATE_GAME_ID_REQUEST_FEEDBACK", value: input.value})
    }
    modifyPassword = (input) => {
        this.props.dispatch({type: "UPDATE_PASSWORD_REQUEST_FEEDBACK", value: input.value})
    }
    loadGameRemotely = () => {

        clearTimeout(APItimeout)

        if (this.props.RequestFeedback.gameID === undefined || this.props.RequestFeedback.gameID === "") {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Please enter the ID of the game."})
        } 

        if (this.props.RequestFeedback.password === undefined || this.props.RequestFeedback.password === "") {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Please enter the password."})
        }
        if (this.props.RequestFeedback.password.length < 8) {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "This password is too short."})
        }

        this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Loading..."})
        
        this.props.API("loadgame", true)

    }
    saveGameRemotely = () => {

        clearTimeout(APItimeout)

        if (this.props.CharacterSheet.GameState === "" && (this.props.RequestFeedback.gameID === undefined || this.props.RequestFeedback.gameID === "")) {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Please enter the ID of the game you wish to delete."})
        }

        if (this.props.RequestFeedback.password === undefined || this.props.RequestFeedback.password === "") {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Please enter the password."})
        }
        if (this.props.RequestFeedback.password.length < 8) {
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "This password is too short."})
        }
        
        this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Saving..."})

        this.props.API("savegame", true)

    }
    toggleAutoSave = (input) => {

        if (this.props.RequestFeedback.gameID === undefined || this.props.RequestFeedback.gameID === "") {
            this.props.dispatch({type: "Autosave", value: false})
            return this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: "Please enter a game ID before enabling autosaving."})
        }

        this.props.dispatch({type: "Autosave", value: input.checked, API: this.props.API, save: true})
        this.props.dispatch({type: "UPDATE_VALIDATION_REQUEST_FEEDBACK", value: null})

    }
    render() {
        return (
            <View>
                <Label onClick={this.toggleDetails}>Remote Game ID</Label>
                <View hidden={this.state.hideDetails}>
                    <Input value={this.props.RequestFeedback.gameID} onChange={this.modifyGameID} noAutoSave/>
                    <Label>Password</Label>
                    <Input type="password" value={this.props.RequestFeedback.password} onChange={this.modifyPassword} noAutoSave/>
                    <View>{this.props.RequestFeedback ? this.props.RequestFeedback.message : null}</View>
                    <Button onClick={this.loadGameRemotely}>Load Game Remotely</Button>
                    <Button onClick={this.saveGameRemotely}>{this.props.CharacterSheet.GameState === "" ? "Delete Game Remotely" : "Save Game Remotely"}</Button>
                    <Input name="Autosave" type="checkbox" onChange={this.toggleAutoSave} inline/>
                    <LabelInline htmlFor="Autosave">Auto save</LabelInline>
                </View>
            </View>
        )
    }
}
const SaveAndLoadRemotely = connect(mapStateToProps)(SaveAndLoadRemotelyView)

class Spacer extends Component {
    render() {
        return (
            <View style={{height: "50px"}}/>
        )
    }
}

class Group extends Component {
    render() {
        return (
            <View hidden={this.props.hidden}>
                <Label hidden={this.props.type === "checkbox"}>{this.props.name}{this.props.append ? <Text> ({this.props.append})</Text> : null}</Label>
                <Input
                    name={this.props.name.replace(/ /g,"")}
                    type={this.props.type}
                    numbers={this.props.numbers}
                    negativeNumbers={this.props.negativeNumbers}
                    noPlusAndMinus={this.props.noPlusAndMinus}
                    select={this.props.select}
                    box={this.props.box}
                    inline={this.props.type === "checkbox"}
                />
                <LabelInline htmlFor={this.props.name.replace(/ /g,"")} hidden={this.props.type !== "checkbox"} style={this.props.type !== "checkbox" ? null : {height: "26px", display: "inline"}}>{this.props.name}{this.props.append ? <Text> ({this.props.append})</Text> : null}</LabelInline>

            </View>
        )
    }
}

class InputView extends Component {

    onChange = (input) => {

        if (this.props.onChange) {
            return this.props.onChange(input.target)
        }

        let value = null

        if (!input.target) {

            if (this.props.negativeNumbers) {
                value = (this.props.CharacterSheet[this.props.name] || 0) + Number(input)
            }
            else {
                value = (this.props.CharacterSheet[this.props.name] || "") + input                
            }


            return this.props.dispatch({type: this.props.name, value: value, API: this.props.API, save: true})
        }

        value = input.target.value

        if (this.props.type === "checkbox") {
            value = input.target.checked
        }

        this.props.dispatch({type: this.props.name, value: value, API: this.props.API, save: this.props.type === "checkbox"})
    }

    onBlur = () => {
        this.props.dispatch({type: "AUTO_SAVE", API: this.props.API, save: true})
    }

    increment = () => {
        this.props.dispatch({type: "INCREMENT_" + this.props.name, API: this.props.API, save: true})
    }

    decrement = () => {
        this.props.dispatch({type: "DECREMENT_" + this.props.name, API: this.props.API, save: true})
    }

    clear = () => {

        if (!this.props.name) {
            return this.props.onChange("")
        }

        this.props.dispatch({type: this.props.name, value: "", API: this.props.API, save: true})
    }

    generateSelectOptions = () => {
        if (this.props.optGroups) {

            let optGroups = this.props.optGroups.map((optGroup, index) => {
                return (<PickerItemGroup key={optGroup.name} label={optGroup.name}/>)
            })

            let options = this.props.select.map((option, index) => {

                

                return <PickerItem key={option.name}>{this.props.showIndex ? index + " - " + option.name : option.name}</PickerItem>
            })
            
            this.props.optGroups.map((optGroup, index) => {
                options.splice(optGroup.position, 0, optGroups[index])
                return null
            })

            return (options)
        }
        else {

            return (
                this.props.select.map((option, index) => {return <PickerItem key={option.name}>{this.props.showIndex ? index + " - " + option.name : option.name}</PickerItem>})
            )

        }
    }

    render() {
        if (this.props.hidden) return null
        if (this.props.select) {
            return (
                <View style={{marginBottom: "8px"}}>
                    <Picker
                        id={this.props.name}
                        style={{width: "98%", padding: "2px"}}
                        value={this.props.value || this.props.CharacterSheet[this.props.name] || ""}
                        onChange={this.onChange}
                    >
                        {this.generateSelectOptions()}
                    </Picker>
                </View>
            )
        }
        if (this.props.box) {
            return (
                <View style={{marginBottom: "8px"}}>
                    <textarea
                        id={this.props.name}
                        style={{width: "98%", height: "200px", padding: "2px"}}
                        value={this.props.value || this.props.CharacterSheet[this.props.name] || ""}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                    />
                </View>
            )
        }
        return (
            <View style={{marginBottom: "8px", display: (this.props.inline ? "inline-block" : null)}}>
                <TextInput
                    id={this.props.name}
                    style={this.props.type === "checkbox" ? null : {width: (this.props.type === "number" && !this.props.noPlusAndMinus ? "calc(98% - 68px)" : "calc(98% - 36px)"), height: "26px", padding: "2px"}}
                    value={this.props.value || (this.props.CharacterSheet[this.props.name] === undefined ? "" : String(this.props.CharacterSheet[this.props.name]))}
                    checked={this.props.type === "checkbox" ? (this.props.CharacterSheet[this.props.name] || false) : null}
                    type={this.props.type}
                    onChange={this.onChange}
                    onBlur={this.props.type === "checkbox" || this.props.noAutoSave ? null : this.onBlur}
                />
                {(this.props.type !== "number" && this.props.type !== "checkbox") || this.props.noPlusAndMinus
                    ?
                    <Text>
                        <Button style={{marginLeft: "5px", width: "25px", height: "34px"}} onClick={this.clear} inline>X</Button>
                    </Text>
                    : null
                }
                {this.props.type === "number" && !this.props.noPlusAndMinus
                    ?
                    <Text>
                        <Button style={{marginLeft: "5px", width: "25px", height: "34px"}} onClick={this.decrement} inline>-</Button>
                        <Button style={{marginLeft: "5px", width: "25px", height: "34px"}} onClick={this.increment} inline>+</Button>
                    </Text>
                    : null
                }
                {this.props.numbers
                    ? 
                    <View>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>1</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>2</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>3</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>4</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>5</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>6</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>7</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>8</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>9</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center"}} inline>0</Button>
                    </View>
                    : null
                }
                {this.props.negativeNumbers
                    ? 
                    <View>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-1</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-2</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-3</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-4</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-5</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-6</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-7</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-8</Button>
                        <Button addFaceValue={this.onChange} style={{marginRight: "5px", marginTop: "5px", width: "25px", height: "34px", textAlign: "center", padding: "3px"}} inline>-9</Button>
                    </View>
                    : null
                }
            </View>
        )
    }
}
const Input = connect(mapStateToProps)(InputView)