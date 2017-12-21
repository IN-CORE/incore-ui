//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.datacollection;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Literal (static) text to be used in the instrument using the StructuredString structure plus an attribute allowing for the specification of white space to be preserved.
 * <p>
 * <p>Java class for LiteralTextType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="LiteralTextType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:datacollection:3_2}TextContentType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}Text"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LiteralTextType", propOrder = {
        "text"
})
public class LiteralTextType
        extends TextContentType {

    @XmlElement(name = "Text", required = true)
    protected TextType text;

    /**
     * The value of the static text string. Supports the optional use of XHTML formatting tags within the string structure. If the content of a literal text contains more than one language, i.e. "What is your understanding of the German word 'Gesundheit'?", the foreign language element should be placed in a separate LiteralText component with the appropriate xml:lang value and, in this case, isTranslatable set to "false". If the existence of white space is critical to the understanding of the content (such as inclusion of a leading or trailing white space), set the attribute of Text xml:space to "preserve".
     *
     * @return possible object is
     * {@link TextType }
     */
    public TextType getText() {
        return text;
    }

    /**
     * Sets the value of the text property.
     *
     * @param value allowed object is
     *              {@link TextType }
     */
    public void setText(TextType value) {
        this.text = value;
    }

}