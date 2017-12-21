//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.logicalproduct;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.IdentifiableType;
import Metadata.Specifications.DDI.LifeCycle.reusable.MeasureDefinitionReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ValueType;


/**
 * An attribute may be any object which should be attached to all or part of the NCube. It may be defined as a Variable or contain textual content (such as a footnote).
 * <p>
 * <p>Java class for AttributeType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="AttributeType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}IdentifiableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;choice&gt;
 *           &lt;element ref="{ddi:reusable:3_2}VariableReference"/&gt;
 *           &lt;element name="AttachmentValue" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;/choice&gt;
 *         &lt;element ref="{ddi:logicalproduct:3_2}AttachmentRegionReference" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}MeasureDefinitionReference" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}ValueRange" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *       &lt;attribute name="attachmentLevel" type="{ddi:logicalproduct:3_2}AttachmentLevelCodeType" default="Cube" /&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AttributeType", propOrder = {
        "variableReference",
        "attachmentValue",
        "attachmentRegionReference",
        "measureDefinitionReference",
        "value"
})
public class AttributeType
        extends IdentifiableType {

    @XmlElement(name = "VariableReference", namespace = "ddi:reusable:3_2")
    protected ReferenceType variableReference;
    @XmlElement(name = "AttachmentValue")
    protected String attachmentValue;
    @XmlElement(name = "AttachmentRegionReference")
    protected ReferenceType attachmentRegionReference;
    @XmlElement(name = "MeasureDefinitionReference", namespace = "ddi:reusable:3_2")
    protected List<MeasureDefinitionReferenceType> measureDefinitionReference;
    @XmlElement(name = "ValueRange", namespace = "ddi:reusable:3_2")
    protected List<ValueType> value;
    @XmlAttribute(name = "attachmentLevel")
    protected AttachmentLevelCodeType attachmentLevel;

    /**
     * A reference to a variable that describes the attribute.
     *
     * @return possible object is
     * {@link ReferenceType }
     */
    public ReferenceType getVariableReference() {
        return variableReference;
    }

    /**
     * Sets the value of the variableReference property.
     *
     * @param value allowed object is
     *              {@link ReferenceType }
     */
    public void setVariableReference(ReferenceType value) {
        this.variableReference = value;
    }

    /**
     * Gets the value of the attachmentValue property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getAttachmentValue() {
        return attachmentValue;
    }

    /**
     * Sets the value of the attachmentValue property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setAttachmentValue(String value) {
        this.attachmentValue = value;
    }

    /**
     * Reference to the CoordinateRegion that defines the attachment point for the attribute.
     *
     * @return possible object is
     * {@link ReferenceType }
     */
    public ReferenceType getAttachmentRegionReference() {
        return attachmentRegionReference;
    }

    /**
     * Sets the value of the attachmentRegionReference property.
     *
     * @param value allowed object is
     *              {@link ReferenceType }
     */
    public void setAttachmentRegionReference(ReferenceType value) {
        this.attachmentRegionReference = value;
    }

    /**
     * Reference to the MeasureDefinition that the attribute is attached to.Gets the value of the measureDefinitionReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the measureDefinitionReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMeasureDefinitionReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MeasureDefinitionReferenceType }
     */
    public List<MeasureDefinitionReferenceType> getMeasureDefinitionReference() {
        if (measureDefinitionReference == null) {
            measureDefinitionReference = new ArrayList<MeasureDefinitionReferenceType>();
        }
        return this.measureDefinitionReference;
    }

    /**
     * Reference to the specified ValueRange of the MeasureDefinition that the attribute is attached to.Gets the value of the value property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the value property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getValue().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ValueType }
     */
    public List<ValueType> getValue() {
        if (value == null) {
            value = new ArrayList<ValueType>();
        }
        return this.value;
    }

    /**
     * Gets the value of the attachmentLevel property.
     *
     * @return possible object is
     * {@link AttachmentLevelCodeType }
     */
    public AttachmentLevelCodeType getAttachmentLevel() {
        if (attachmentLevel == null) {
            return AttachmentLevelCodeType.CUBE;
        } else {
            return attachmentLevel;
        }
    }

    /**
     * Sets the value of the attachmentLevel property.
     *
     * @param value allowed object is
     *              {@link AttachmentLevelCodeType }
     */
    public void setAttachmentLevel(AttachmentLevelCodeType value) {
        this.attachmentLevel = value;
    }

}