//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.ddiprofile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.CodeValueType;
import Metadata.Specifications.DDI.LifeCycle.reusable.LabelType;
import Metadata.Specifications.DDI.LifeCycle.reusable.MaintainableType;
import Metadata.Specifications.DDI.LifeCycle.reusable.NameType;
import Metadata.Specifications.DDI.LifeCycle.reusable.StructuredStringType;


/**
 * Describes the subset of valid DDI objects used by an agency for a specified purpose. This may be the required and supported objects for a specific system, a profile for deposit in an archive, requirements at different points of production, etc. In addition to the standard name, label, and description the DDI Profile describes the intended application of the profile, its purpose, the version of XPath used in describing the supported objects, the DDI namespace (major and minor version numbers), a mapping of schema to prefixes (if different from the standard DDI models), a set of instructions for use of the profile, and a listing of used and unsupported objects. These objects may be constrained (i.e., change from optional to required), provided a fixed value, or provided a local name.
 * <p>
 * <p>Java class for DDIProfileType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="DDIProfileType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}MaintainableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:ddiprofile:3_2}DDIProfileName" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Label" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Description" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:ddiprofile:3_2}ApplicationOfProfile" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Purpose" minOccurs="0"/&gt;
 *         &lt;element name="XPathVersion" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="DDINamespace" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:ddiprofile:3_2}XMLPrefixMap" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:ddiprofile:3_2}Instructions" minOccurs="0"/&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:ddiprofile:3_2}Used"/&gt;
 *           &lt;element ref="{ddi:ddiprofile:3_2}NotUsed"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DDIProfileType", propOrder = {
        "ddiProfileName",
        "label",
        "description",
        "applicationOfProfile",
        "purpose",
        "xPathVersion",
        "ddiNamespace",
        "xmlPrefixMap",
        "instructions",
        "usedOrNotUsed"
})
public class DDIProfileType
        extends MaintainableType {

    @XmlElement(name = "DDIProfileName")
    protected List<NameType> ddiProfileName;
    @XmlElement(name = "Label", namespace = "ddi:reusable:3_2")
    protected List<LabelType> label;
    @XmlElement(name = "Description", namespace = "ddi:reusable:3_2")
    protected StructuredStringType description;
    @XmlElement(name = "ApplicationOfProfile")
    protected List<CodeValueType> applicationOfProfile;
    @XmlElement(name = "Purpose", namespace = "ddi:reusable:3_2")
    protected StructuredStringType purpose;
    @XmlElement(name = "XPathVersion", required = true, defaultValue = "1.0")
    protected BigDecimal xPathVersion;
    @XmlElement(name = "DDINamespace")
    protected BigDecimal ddiNamespace;
    @XmlElement(name = "XMLPrefixMap")
    protected List<XMLPrefixMapType> xmlPrefixMap;
    @XmlElement(name = "Instructions")
    protected StructuredStringType instructions;
    @XmlElements({
            @XmlElement(name = "Used", type = UsedType.class),
            @XmlElement(name = "NotUsed", type = NotUsedType.class)
    })
    protected List<Object> usedOrNotUsed;

    /**
     * A name for the profile. May be expressed in multiple languages. Repeat the element to express names with different content, for example different names for different systems.Gets the value of the ddiProfileName property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the ddiProfileName property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDDIProfileName().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NameType }
     */
    public List<NameType> getDDIProfileName() {
        if (ddiProfileName == null) {
            ddiProfileName = new ArrayList<NameType>();
        }
        return this.ddiProfileName;
    }

    /**
     * A display label for the profile. May be expressed in multiple languages. Repeat for labels with different content, for example, labels with differing length limitations.Gets the value of the label property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the label property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLabel().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link LabelType }
     */
    public List<LabelType> getLabel() {
        if (label == null) {
            label = new ArrayList<LabelType>();
        }
        return this.label;
    }

    /**
     * A description of the content and purpose of the profile. May be expressed in multiple languages and supports the use of structured content.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setDescription(StructuredStringType value) {
        this.description = value;
    }

    /**
     * A brief description of the intended applications of the profile. Supports the use of an external controlled vocabulary.Gets the value of the applicationOfProfile property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the applicationOfProfile property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getApplicationOfProfile().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CodeValueType }
     */
    public List<CodeValueType> getApplicationOfProfile() {
        if (applicationOfProfile == null) {
            applicationOfProfile = new ArrayList<CodeValueType>();
        }
        return this.applicationOfProfile;
    }

    /**
     * Purpose describes the purpose of creating the profile such as describing the coverage of a distribution software system.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getPurpose() {
        return purpose;
    }

    /**
     * Sets the value of the purpose property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setPurpose(StructuredStringType value) {
        this.purpose = value;
    }

    /**
     * Gets the value of the xPathVersion property.
     *
     * @return possible object is
     * {@link BigDecimal }
     */
    public BigDecimal getXPathVersion() {
        return xPathVersion;
    }

    /**
     * Sets the value of the xPathVersion property.
     *
     * @param value allowed object is
     *              {@link BigDecimal }
     */
    public void setXPathVersion(BigDecimal value) {
        this.xPathVersion = value;
    }

    /**
     * Gets the value of the ddiNamespace property.
     *
     * @return possible object is
     * {@link BigDecimal }
     */
    public BigDecimal getDDINamespace() {
        return ddiNamespace;
    }

    /**
     * Sets the value of the ddiNamespace property.
     *
     * @param value allowed object is
     *              {@link BigDecimal }
     */
    public void setDDINamespace(BigDecimal value) {
        this.ddiNamespace = value;
    }

    /**
     * If you are not using the standard DDI prefix or the full DDI name then provide mapping. For each XML namespace used in the profile's XPath expressions, the XML namespaces must have their prefix specified using this element.Gets the value of the xmlPrefixMap property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the xmlPrefixMap property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getXMLPrefixMap().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link XMLPrefixMapType }
     */
    public List<XMLPrefixMapType> getXMLPrefixMap() {
        if (xmlPrefixMap == null) {
            xmlPrefixMap = new ArrayList<XMLPrefixMapType>();
        }
        return this.xmlPrefixMap;
    }

    /**
     * Instructions for use of the profile. Supports multiple language versions of the same content as well as optional formatting of the content.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getInstructions() {
        return instructions;
    }

    /**
     * Sets the value of the instructions property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setInstructions(StructuredStringType value) {
        this.instructions = value;
    }

    /**
     * Gets the value of the usedOrNotUsed property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the usedOrNotUsed property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getUsedOrNotUsed().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link UsedType }
     * {@link NotUsedType }
     */
    public List<Object> getUsedOrNotUsed() {
        if (usedOrNotUsed == null) {
            usedOrNotUsed = new ArrayList<Object>();
        }
        return this.usedOrNotUsed;
    }

}
