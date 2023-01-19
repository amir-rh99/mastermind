import { useContext } from "react";
import "./About.scss";
import { ReactComponent as GithubSvg } from "@svg/github.svg";
import { ReactComponent as GithubWhiteSvg } from "@svg/githubWhite.svg";
import { GameContext } from "@app/store/GameContext";

const About = () => {
    
    const { theme } = useContext(GameContext)

    return(
        <div className="about">
            <h2 className="title">
                MasterMind
            </h2>
            <p>
                Find the Colors in 8 steps
            </p>

            <p>
                There is a Target with 4 colors that you must Find those in 8 steps.
            </p>

            <ul>
                <li>
                    There is no duplicate color among the target colors
                </li>
                <li>
                    Each Color has a number that help you to find colors better
                </li>
            </ul>

            <div className="divider"></div>

            <p>
                The result of each of your attempts is indicated by three different colors of <span className="exact">green</span>, <span className="correct">yellow</span> and <span className="wrong">red</span> on the right side of each row that give the following meanings to the number of colors you see:
            </p>

            <p>
                <span>green: </span>
                <span>
                    <span className="exact"> Correct Color </span>
                    in the
                    <span className="exact"> Correct Position </span>
                </span>
            </p>

            <p>
                <span>yellow: </span>
                <span>
                    <span className="exact"> Correct Color </span>
                    in the
                    <span className="correct"> Wrong Position </span>
                </span>
            </p>

            <p>
                <span>red: </span>
                <span>
                    <span className="wrong"> Wrong Color </span>
                </span>
            </p>

            <p className="note">
             Note that the position of the colors you see in the result has nothing to do with the position of your guessed colors.
            </p>

            <div className="divider"></div>

            <div className="github">
                <a href="https://github.com/amir-rh99/mastermind" target="_blank">
                    {
                        theme == "dark" ?
                        <GithubWhiteSvg /> :
                        <GithubSvg />
                    }
                </a>
            </div>
        </div>
    )
}

export default About;